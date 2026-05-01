'use strict';

function logger (req, res, next) {
  const method = req.method;
  const url = req.url;
  const start = Date.now();

  console.log(`[${new Date().toISOString()}] ${method} → ${url} - Started`);

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${method} → ${url} → ${res.statusCode} → ${duration}ms`)
  })

  next();
}

module.exports = logger;