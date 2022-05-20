const { ApiError } = require("../error");
const { statusCode } = require("../constants");
const { queryValidator } = require("../validators");

const validateQuery = (req, res, next) => {
  try {
    const { error } = queryValidator.querySchemaValidator.validate(req.query);

    if (error) {
      next(new ApiError(error.details[0].message, statusCode.badRequestStatus));
      return;
    }

    next()
  }
  catch (e) {
    next(e);
  }
};

module.exports = {
  validateQuery,
};
