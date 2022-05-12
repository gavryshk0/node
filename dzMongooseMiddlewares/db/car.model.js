const { Schema, model } = require('mongoose');

const {carModelsEnum} = require('../constants');

const Car = new Schema({
  model: { type: String, trim: true, uppercase: true, required: true, enum: Object.values(carModelsEnum)},
  year: { type: Number },
},
{ timestamps: false }
);

module.exports = model("Car", Car);
