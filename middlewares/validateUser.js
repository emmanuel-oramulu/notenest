function validateUser(req, res, next) {
  const { username, email, password } = req.body;

  if (!username || !username.trim()) {
    const err = new Error('Username is required');
    err.status = 400;
    return next(err);
  }
  if (!email || !email.trim()) {
    const err = new Error('Email is required');
    err.status = 400;
    return next(err);
  }
  if (!password || !password.trim()) {
    const err = new Error('Password is required');
    err.status = 400;
    return next(err);
  }

  next();
}

module.exports = validateUser;