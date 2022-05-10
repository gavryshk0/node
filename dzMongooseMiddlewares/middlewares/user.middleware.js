const User = require('../db/user.model');
const ApiError = require('../error/ApiError');

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
  checkDoesUserExist,
  checkIsEmailDuplicate,
  checkGender
}
