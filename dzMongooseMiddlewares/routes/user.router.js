const { Router } = require('express');
const userRouter = Router();
const userController = require('../controllers/user.controller');
const userMiddlewares = require('../middlewares/user.middleware');

module.exports = userRouter;


userRouter.get('/pages', userController.getUserPage);

userRouter.get('/', userController.getAllUser);

userRouter.post('/', userMiddlewares.checkIsEmailDuplicate, userMiddlewares.checkGender, userController.createUser);

userRouter.get('/:userID', userController.getUserByID);

userRouter.all('/:userID', userMiddlewares.checkDoesUserExist);

userRouter.patch('/:userID', userController.updateUser);

userRouter.delete('/:userID', userController.deleteUser);
