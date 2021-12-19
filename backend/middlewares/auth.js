const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');

module.exports = (req, res, next) => {
  const { NODE_ENV, JWT_SECRET } = process.env;
  const authorization = req.headers;
  if (!authorization) {
    return next(new AuthError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(authorization, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    return next(new AuthError('Необходима авторизация'));
  }

  req.user = payload;
  return next();
};
