const Joi = require('joi');

const { constants } = require('../constants')

const carSchemaUpdate = Joi.object({
  model: Joi.string().min(2).max(30).trim().required(),
  year: Joi.number().min(1900).max(constants.CURRENT_YEAR)
});

module.exports = {
  carSchemaUpdate
};
