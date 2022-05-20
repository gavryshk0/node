const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { ApiError } = require('../error');
const { statusCode, tokenEnum } = require('../constants')
const { ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_SECRET_KEY } = require('../config/config')

async function comparePasswords(hashPassword, password) {
  const isPasswordSame = await bcrypt.compare(password, hashPassword);

  if (!isPasswordSame) {
    throw new ApiError('Wrong password', statusCode.badRequestStatus);
  }
}

function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

function generateToken(encodeData = {}) {
  const access_token = jwt.sign(encodeData, REFRESH_TOKEN_SECRET_KEY,{expiresIn: '15s' });
  const refresh_token = jwt.sign(encodeData, REFRESH_TOKEN_SECRET_KEY, { expiresIn: '30m' });

  return {
    access_token,
    refresh_token
  }
}

function validateToken(token, tokenType = tokenEnum.ACCESS) {
  try {
    let secretWord = ACCESS_TOKEN_SECRET_KEY;

    if(tokenType === tokenEnum.REFRESH) {
      secretWord = REFRESH_TOKEN_SECRET_KEY;
    }

    return jwt.verify(token, secretWord);
  }
  catch (e) {
    throw new ApiError(e.message || 'Invalid Token', statusCode.unauthorizedStatus);
  }
}

module.exports = {
  comparePasswords,
  hashPassword,
  generateToken,
  validateToken
};
