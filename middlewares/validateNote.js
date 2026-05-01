function validateNote (req, res, next) {
  const note = req.body;

  if (!Object.hasOwn(note, 'title')) {
    const err = new Error('Title field is required');
    err.status = 400;
    return next(err);
  }
  
  if (!Object.hasOwn(note, 'body')) {
    const err = new Error('Body field is required');
    err.status = 400;
    return next(err);
  }

  next();
}

module.exports = validateNote;