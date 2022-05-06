const { Router } = require('express');
const userRouter = Router();
const userController = require('../controllers/user.controller');
const userMiddlewares = require('../middlewares/user.middleware');

module.exports = userRouter;

userRouter.get('/', userController.getAllUser);

userRouter.get('/:userID', userController.getUserByID);

userRouter.post('/', userMiddlewares.checkIsEmailDuplicate, userMiddlewares.checkGender, userController.createUser);

userRouter.delete('/:userID', userController.deleteUser);