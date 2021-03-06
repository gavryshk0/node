const {Car} = require('../db');
const ApiError = require('../error/ApiError');

module.exports = {
  getCarPage: async (req, res, next) => {
    try {
      const {limit , page} = req.query;

      if (limit < 0 || page < 0) {
        next(new ApiError('Недійсне значення', 400));
        return;
      }
      const skip = (page - 1) * limit;
      const cars = await Car.find().limit(limit).skip(skip);
      const count = await Car.count({})

      res.json({
        page,
        perPage: limit,
        count,
        data: cars
      });
    }
    catch (e) {
      next(e);
    }
  },

  getCarByID: async (req, res, next) => {
    try {
      const {carID} = req.params;
      const car = await Car.findById(carID);

      if (!car) {
        next(new ApiError('Немає машинки під цим айді', 404));
        return;
      }

      res.json(car);
    }
    catch (e) {
      next(e);
    }
  },

  addCar: async (req, res, next) => {
    try {
      const addCar = await Car.create(req.body);
      res.status(201).json(addCar);
    }
    catch (e) {
      next(e);
    }
  },

  updateCar: async (req, res, next) => {
    try {
      const {carID, model, year} = req.params;
      const car = await Car.findByIdAndUpdate(carID, {
        model,
        year,
      });

      res.status(200).json(car);
    }
    catch (e) {
      next(e);
    }
  },

  deleteCar: async (req, res, next) => {
    try {
      const { carID } = req.params;
      const cars = await Car.findByIdAndDelete(carID);

      if (!cars) {
        next(new ApiError('Немає машинки під цим айді', 404));
        return;
      }
      res.status(204).send();
    }
    catch (e) {
      next(e);
    }
  },
};
