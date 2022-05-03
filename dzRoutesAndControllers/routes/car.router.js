const { Router } = require('express');
const carRouter = Router();
const carController = require('../controllers/car.controller');

module.exports = carRouter;

carRouter.get('/', carController.getAllCars);

carRouter.get('/:carID', carController.getCarByID);

carRouter.post('/', carController.addCar);

carRouter.delete('/:carID', carController.deleteCar);