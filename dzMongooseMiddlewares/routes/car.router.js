const { Router } = require('express');
const carRouter = Router();
const carController = require('../controllers/car.controller');
const carMiddlewares = require('../middlewares/car.middleware');

module.exports = carRouter;

carRouter.get('/', carController.getAllCars);

carRouter.get('/:carID', carController.getCarByID);

carRouter.post('/', carMiddlewares.checkField, carMiddlewares.checkCarYear, carController.addCar);

carRouter.patch('/:carID', carController.updateCar);

carRouter.delete('/:carID', carMiddlewares.checkID, carController.deleteCar);