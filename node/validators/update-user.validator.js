const Joi = require('joi');

const userSchemaUpdate = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  age: Joi.number().min(6).required(),
  email: Joi.string().email().lowercase(),
  gender: Joi.string().valid('male', 'female')
});

module.exports = {
  userSchemaUpdate
};
