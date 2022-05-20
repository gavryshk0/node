const { Router } = require('express');

const { carController } = require('../controllers')
const { carMiddleware, queryMiddleware } = require('../middlewares');

const carRouter = Router();

module.exports = carRouter;

carRouter.get('/pages', queryMiddleware.validateQuery, carController.getCarPage);

carRouter.post('/', carMiddleware.carValidate, carController.addCar);

carRouter.all('/:carID', carMiddleware.checkDoesCarExist);

carRouter.get('/:carID', carController.getCarByID);

carRouter.patch('/:carID', carMiddleware.carUpdateValidate, carController.updateCar);

carRouter.delete('/:carID', carMiddleware.checkID, carController.deleteCar);
