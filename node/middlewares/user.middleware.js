const { User } = require('../db');
const { userValidator, updateUserValidator} = require('../validators');
const { ApiError } = require('../error');
const {userErrorsEnum, statusCode} = require('../constants');

const userValidate = (req, res, next) => {
  try {
    const {error, value} = userValidator.newUserSchema.validate(req.body);

    if (error.message) {
      next(new ApiError(error.details[0].message, statusCode.badRequestStatus));
      return;
    }

    req.body = value;
    next();
  }
  catch (e) {
    next(e);
  }
}

// eslint-disable-next-line arrow-body-style
const getUserDynamically = (paramName = '_id', where = 'body', dataBaseField = paramName) => {
  return async (req, res, next) => {
    try {
      const reqElement = req[where];

      if (!reqElement || typeof reqElement !== 'object') {
        next(new ApiError('Wrong search param in middleware'));
        return;
      }

      const param = reqElement[paramName];

      const user = await User.findOne({ [dataBaseField]: param }).select("+password");

      if (!user) {
        next(new ApiError(userErrorsEnum.notFoundUser, statusCode.notFoundStatus));
        return;
      }

      req.user = user;
      next()
    }
    catch (e) {
      next(e);
    }
  }
};

const checkDoesUserExist = async (req, res, next) => {
  try {
    const {userID} = req.params;
    const currentUser = await User.findById(userID);

    if(!currentUser) {
      next(new ApiError(userErrorsEnum.notFoundUser, statusCode.notFoundStatus));
      return;
    }

    req.user = currentUser;
    next();
  }
  catch (e) {
    next(e);
  }
}

const checkIsEmailDuplicate = async (req, res, next) => {
  try {
    const { email = '' } = req.body;
    const isUserPresent = await User.findOne({ email: email.toLowerCase().trim()});

    if (isUserPresent) {
      next(new ApiError(userErrorsEnum.occupiedEmail, statusCode.conflictStatus))
      return;
    }

    next();
  }
  catch (e) {
    next(e);
  }
}

const userUpdateValidate = (req, res, next) => {
  try {
    const { value, error } = updateUserValidator.userSchemaUpdate.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, statusCode.badRequestStatus));
      return;
    }

    req.body = Object.assign(req.body, value);
    next()
  }
  catch (e) {
    next(e);
  }
};


module.exports = {
  userValidate,
  getUserDynamically,
  checkDoesUserExist,
  checkIsEmailDuplicate,
  userUpdateValidate
}
