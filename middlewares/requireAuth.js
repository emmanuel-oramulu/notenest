const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
  const authHead = req.headers.authorization;
  const token = authHead && authHead.split(' ')[1];

  if (!token) {
    const err = new Error('Unauthorized access');
    err.status = 401;
    return next(err);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();

  } catch(err) {
    err.message = "Invalid or expired token";
    err.status = 401;
    next(err);
  }
}

module.exports = requireAuth;