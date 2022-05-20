const { Car } = require('../db');
const { carValidator, updateCarValidator } = require('../validators');
const {statusCode, carErrorsEnum} = require('../constants');
const {ApiError} = require('../error');

const carValidate = (req, res, next) => {
  try {
    const {error, value} = carValidator.newCarSchema.validate(req.body);

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

const carUpdateValidate = (req, res, next) => {
  try {
    const { error, value } = updateCarValidator.carSchemaUpdate.validate(req.body);

    if (error) {
      next(new ApiError(error.details[0].message, statusCode.badRequestStatus));
      return;
    }

    req.body = value;
    next()
  }
  catch (e) {
    next(e);
  }
};

const checkDoesCarExist = async (req, res, next) => {
  try {
    const {carID} = req.params;
    const currentCar = await Car.findById(carID);

    if (!currentCar) {
      next(new ApiError(carErrorsEnum.notFoundCar, statusCode.notFoundStatus));
      return;
    }

    req.car = currentCar;
    next();
  }
  catch (e) {
    next(e);
  }
}


const checkID = async (req, res, next) => {
  try {
    const {carID} = req.params;
    const isIDExist = await Car.findOne({_id:{carID}});

    if (!isIDExist) {
      next(new ApiError(carErrorsEnum.notFoundCar, statusCode.badRequestStatus));
      return;
    }

    next();
  }
  catch (e) {
    next(e);
  }
}

module.exports = {
  carValidate,
  checkDoesCarExist,
  carUpdateValidate,
  checkID
}
