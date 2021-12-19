const jwt = require('jsonwebtoken');
const AuthError = require('../errors/auth-error');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  // console.log(req.headers.authorization, 'g');
  const authorizationInfo = req.headers.authorization;
  if (!authorizationInfo || !authorizationInfo.startsWith('Bearer ')) {
    throw new AuthError('Ошибка авторизации');
  }

  const token = authorizationInfo.replace('Bearer ', '');
  let payload;

  try {
    console.log(NODE_ENV, JWT_SECRET)
    payload = jwt.verify(token, 'some-secret-key');
    console.log(payload)
  } catch (err) {
    next(new AuthError('Ошибка авторизации111'));
  }

  req.user = payload;
  return next();
};
