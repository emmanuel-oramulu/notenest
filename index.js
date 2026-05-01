'use strict';
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const noteRouter = require('./routes/notes')
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./middlewares/logger');


const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(logger);

app.use('/api/notes', noteRouter);

app.use(errorHandler);

const port = 7000;
app.listen(port, () => {
  console.log(`NoteNest running on port ${port}`);
});