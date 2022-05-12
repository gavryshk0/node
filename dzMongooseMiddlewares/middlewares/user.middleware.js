const { User } = require('../db');
const { userValidator } = require('../validators');
const ApiError = require('../error/ApiError');

const userValidate = (req, res, next) => {
  try {
    const {error, value} = userValidator.newUserJoiSchema.validate(req.body);

    if (error.message) {
      next(new ApiError(error.details[0].message, 400));
      return;
    }

    req.body = value;
    next();
  }
  catch (e) {
    next(e);
  }
}

const checkDoesUserExist = async (req, res, next) => {
  try {
    const {userID} = req.params;
    const currentUser = await User.findById(userID);

    if(!currentUser) {
      next(new ApiError('Юзера не знайдено', 404));
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
      next(new ApiError('Юзер із цією електронною адресою вже існує', 409))
      return;
    }

    next();
  }
  catch (e) {
    next(e);
  }
}

const checkGender = (req, res, next) => {
  try {
    const {gender} = req.body;

    if (gender !== 'female' && gender !== 'male') {
      next(new ApiError('Стать може бути тільки чоловічою або жіночою', 409));
      return;
    }

    next()
  }
  catch (e) {
    next(e);
  }
}

module.exports = {
  userValidate,
  checkDoesUserExist,
  checkIsEmailDuplicate,
  checkGender
}
