const { Router } = require('express');

const carController = require('../controllers/car.controller');
const carMiddlewares = require('../middlewares/car.middleware');

const carRouter = Router();

module.exports = carRouter;

carRouter.all('/:carID', carMiddlewares.checkDoesCarExist);

carRouter.get('/pages', carController.getCarPage);

carRouter.post('/', carMiddlewares.checkField, carMiddlewares.checkCarYear, carController.addCar);

carRouter.get('/:carID', carController.getCarByID);

carRouter.patch('/:carID', carController.updateCar);

carRouter.delete('/:carID', carMiddlewares.checkID, carController.deleteCar);
