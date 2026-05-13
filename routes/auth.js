const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const validateUser = require('../middlewares/validateUser');
const generateId = require('../utils/idGenerator');
const generateToken = require('../utils/generateToken');

const DUMMY_HASH = '$2b$10$abcdefghijklmnopqrstuuABCDEFGHIJKLMNOPQRSTUVWXYZ012345';

let users = [];

router.post('/register', validateUser, async (req, res, next) => {
  const {
    username, email, password
  } = req.body;

  const userExist = users.some(u => email === u.email);

  if (userExist) {
    const err = new Error('User already exist');
    err.status = 400;
    return next(err);
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const id = generateId(users);

  const newUser = {
    id,
    username,
    email,
    password: hashedPassword,
    registeredAt: new Date().toISOString(),
  };

  users.push(newUser);

  // const responseUser = {...newUser};
  // delete responseUser.password;

  const {
    password: _,
    ...responseUser
  } = newUser;


  return res.status(201).json(responseUser);

});

router.post('/login', async (req, res, next) => {
  const {
    email,
    password
  } = req.body;

  const user = users.find(u => u.email === email);

  const match = await bcrypt.compare(password, user ? user.password: DUMMY_HASH);

  if (!user || !match) {
    const err = new Error('Invalid email or password');
    err.status = 401;
    return next(err);
  }

  const token = generateToken(user.id);
  res.status(200).json({
    token
  })
});

module.exports = router;