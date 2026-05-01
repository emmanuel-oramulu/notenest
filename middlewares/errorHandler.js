function errorHandler (err, req, res, next) {
  console.error(err.message);
  const message = err.message || 'Internal server error';
  const status = err.status || 500;

  return res.status(status).json({
    error: message,
    status: status,
  });
}

module.exports = errorHandler;