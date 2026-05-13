'use strict';
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const noteRouter = require('./routes/notes');
const authRouter = require('./routes/auth');
const errorHandler = require('./middlewares/errorHandler');



const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/notes', noteRouter);

app.use(errorHandler);

const port = 7000;
app.listen(port, () => {
  console.log(`NoteNest running on port ${port}`);
});