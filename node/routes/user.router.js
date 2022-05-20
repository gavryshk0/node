const { Router } = require('express');

const { userController } = require('../controllers');
const { userMiddleware, queryMiddleware } = require('../middlewares');

const userRouter = Router();

module.exports = userRouter;

userRouter.get('/pages', queryMiddleware.validateQuery, userController.getUserPage);

userRouter.post('/', userMiddleware.userValidate, userMiddleware.checkIsEmailDuplicate, userController.createUser);

userRouter.all('/:userIndex', userMiddleware.getUserDynamically('userIndex', 'params', '_id'));

userRouter.get('/:userID', userController.getUserByID);

userRouter.patch('/:userID',userMiddleware.userUpdateValidate, userController.updateUser);

userRouter.delete('/:userID', userController.deleteUser);
