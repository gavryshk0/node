const Joi = require('joi');

const { constants } = require('../constants');

const newCarSchema = Joi.object({
  model: Joi.string().min(2).max(50).lowercase().trim().required(),
  year: Joi.number().min(1900).max(constants.CURRENT_YEAR).required(),
});

module.exports = {
  newCarSchema
};
