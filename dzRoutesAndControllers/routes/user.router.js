const { Router } = require('express');
const userRouter = Router();
const userController = require('../controllers/user.controller');

module.exports = userRouter;

userRouter.get('/', userController.getAllUser);

userRouter.get('/:userID', userController.getUserByID);

userRouter.post('/', userController.createUser);

userRouter.delete('/:userID', userController.deleteUser);