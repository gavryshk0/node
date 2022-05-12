const { Car } = require('../db');
const { carValidator } = require('../validators');
const ApiError = require('../error/ApiError');

const carValidate = (req, res, next) => {
  try {
    const {error, value} = carValidator.newCarJoiSchema.validate(req.body);

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

const checkDoesCarExist = async (req, res, next) => {
  try {
    const {carID} = req.params;
    const currentCar = await Car.findById(carID);

    if (!currentCar) {
      next(new ApiError('Машинку не знайдено', 404));
      return;
    }

    req.car = currentCar;
    next();
  }
  catch (e) {
    next(e);
  }
}

const checkField = (req, res, next) => {
  try {
    const {model, year} = req.body;

    if (!model || !year) {
      next(new ApiError('Базові поля мають бути заповнені', 409));
      return;
    }

    next();
  }
  catch (e) {
    next(e);
  }
};

const checkID = async (req, res, next) => {
  try {
    const {carID} = req.params;
    const isIDExist = await Car.findOne({_id:{carID}});

    if (!isIDExist) {
      next(new ApiError('Машинку не знайдено', 404));
      return;
    }
    next();
  }
  catch (e) {
    next(e);
  }
}

const checkCarYear = (req, res, next) => {
  try {
    const {year = ''} = req.body;

    if (year < 1980 && year > 2022)
    {
      next(new ApiError('Рік недійсний', 409));
      return;
    }
    next()
  }
  catch (e) {
    next(e);
  }
}

module.exports = {
  carValidate,
  checkDoesCarExist,
  checkField,
  checkID,
  checkCarYear
}
