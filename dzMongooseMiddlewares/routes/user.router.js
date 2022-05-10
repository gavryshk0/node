const { Router } = require('express');

const userController = require('../controllers/user.controller');
const userMiddlewares = require('../middlewares/user.middleware');

const userRouter = Router();

module.exports = userRouter;

userRouter.all('/:userID', userMiddlewares.checkDoesUserExist);

userRouter.get('/pages', userController.getUserPage);

userRouter.get('/', userController.getAllUser);

userRouter.post('/', userMiddlewares.checkIsEmailDuplicate, userMiddlewares.checkGender, userController.createUser);

userRouter.get('/:userID', userController.getUserByID);

userRouter.patch('/:userID', userController.updateUser);

userRouter.delete('/:userID', userController.deleteUser);
