const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if(!authHeader) {
    const error = new Error('No autenticado');
    error.statusCode = 401;
    throw error;
  }

  const token = req.get('Authorization').split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWTSECRET);
  }
  catch (e) {
    err.statusCode = 500;
    throw e;
  }

  if(!decodedToken) {
    const error = new Error('No autenticado');
    error.statusCode = 401;
    throw error;
  }

  req.userID = decodedToken.userID;
  next();
};