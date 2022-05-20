const { authService } = require('../services')
const { Auth } = require('../db')

module.exports = {
  login: async (req, res, next) => {
    try {
      const { user, body: { password } } = req;

      await authService.comparePasswords(user.password, password);

      const token = authService.generateToken({ userId: user._id });

      await Auth.create({user_id: user._id, ...token});

      res.json({
        ...token,
        user
      });
    }
    catch (e) {
      next(e)
    }
  },

  logout: async (req, res, next) => {
    try {
      await Auth.deleteMany({ user_id: req.authUser._id });

      res.json('ok');
    }
    catch (e) {
      next(e);
    }
  },
};
