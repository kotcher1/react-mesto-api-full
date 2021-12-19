const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const authorizationInfo = req.headers.authorization;
  if (!authorizationInfo || !authorizationInfo.startsWith('Bearer ')) {
    throw new AuthError('Ошибка авторизации');
  }

  const token = authorizationInfo.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
  } catch (err) {
    next(new AuthError('Ошибка авторизации111'));
  }

  req.user = payload;
  return next();
};
