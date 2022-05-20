const {User} = require('../db');
const {authService} = require('../services');
const { ApiError } = require('../error');
const {userErrorsEnum, statusCode} = require('../constants')

module.exports = {
  getUserPage: async (req, res, next) => {
    try {
      const { limit, page } = req.query;

      const skip = (page - 1) * limit;
      const users = await User.find().limit(limit).skip(skip);
      const count = await User.count({});

      res.json({
        page,
        perPage: limit,
        data: users,
        count
      });
    }
    catch (e) {
      next(e);
    }
  },

  getUserByID: (req, res, next) => {
    try {
      if (!req.user) {
        next(new ApiError(userErrorsEnum.notFoundUser, statusCode.notFoundStatus))
        return;
      }
      res.json(req.user);
    }
    catch (e) {
      next(e);
    }
  },

  createUser: async (req, res, next) => {
    try {
      const hashPassword = await authService.hashPassword(req.body.password);
      const createdUser = await User.create({...req.body, password: hashPassword});
      res.json(createdUser);
    }
    catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { userID, name, email, password, gender, age } = req.params;
      const userUpdate = await User.findByIdAndUpdate(userID,{
        name,
        age,
        email,
        password,
        gender
      });

      res.json(userUpdate);
    }
    catch (e) {
      next(e);
    }
  },

  deleteUser: async (req, res, next) => {
    try {
      const {userID} = req.params;
      const user = await User.findByIdAndDelete(userID);

      if (!user) {
        next(new ApiError(userErrorsEnum.notValidIDDel, statusCode.badRequestStatus));
        return;
      }

      res.status(204).send(user);
    }
    catch (e) {
      next(e);
    }
  }
}
