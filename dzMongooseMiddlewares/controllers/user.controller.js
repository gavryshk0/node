const User = require('../db/user.model');
const ApiError = require('../error/ApiError');

module.exports = {
  getUserPage: async (req, res, next) => {
    try {
      const { limit = 20, page = 1 } = req.query;
      const skip = (page - 1) * limit;

      const users = await User.find().limit(limit).skip(skip);
      const count = await User.count({});

      res.json({
        page,
        perPage: limit,
        data: users,
        count
      });
    } catch (e) {
      next(e);
    }
  },

  getAllUser: async (req, res, next) => {
    try {
      const users = await User.find();
      res.json(users);
    }
    catch (e) {
      next(e);
    }
  },

  getUserByID: (req, res, next) => {
    try {
      if (!req.user) {
        next(new ApiError('Юзера не знайдено', 404))
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
      const createdUser = await User.create(req.body);
      res.status(201).json(createdUser);
    }
    catch (e) {
      next(e);
    }
  },

  updateUser: async (req, res, next) => {
    try {
      const { userID } = req.params;
      const user = await User.findByIdAndUpdate(userID, req.body);

      res.status(200).json(user);
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
        next(new ApiError('Неможливо видалити не існуючого юзера', 400));
        return;
      }

      res.status(204).send(user);
    }
    catch (e) {
      next(e);
    }
  }
}
