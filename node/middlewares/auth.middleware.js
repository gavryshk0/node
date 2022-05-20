const { authService } = require('../services');
const { authValidator } = require('../validators');
const { Auth } = require('../db');
const { ApiError } = require('../error');
const { statusCode, tokenEnum} = require('../constants');

async function checkAccessToken(req, res, next) {
  try {
    const access_token = req.get('Authorization');

    if (!access_token) {
      next(new ApiError('No token', statusCode.unauthorizedStatus));
      return;
    }

    authService.validateToken(access_token, tokenEnum.ACCESS);

    const tokenDataAccess = await Auth.findOne({ access_token }).populate('user_id');

    if (!tokenDataAccess || !tokenDataAccess.user_id) {
      next(new ApiError('Not valid token', statusCode.unauthorizedStatus));
      return;
    }

    req.authUser = tokenDataAccess.user_id;
    next();
  }
  catch (e) {
    next(e);
  }
}

async function checkRefreshToken(req, res, next) {
  try {
    const refresh_token = req.get('Authorization');

    if (!refresh_token) {
      next(new ApiError('No token', statusCode.unauthorizedStatus));
      return;
    }

    authService.validateToken(refresh_token, tokenEnum.REFRESH);

    const tokenDataRefresh = await Auth.findOne({ refresh_token }).populate('user_id');

    if (!tokenDataRefresh || !tokenDataRefresh.user_id) {
      next(new ApiError('Not valid token', statusCode.unauthorizedStatus));
      return;
    }

    req.authUser = tokenDataRefresh.user_id;
    next()
  }
  catch (e) {
    next(e);
  }
}

function isLoginDataValid(req, res, next) {
  try {
    const { value, error } = authValidator.loginSchema.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message));
      return;
    }

    req.body = value;
    next();
  }
  catch (e) {
    next(e);
  }
}

module.exports = {
  checkAccessToken,
  checkRefreshToken,
  isLoginDataValid
};
