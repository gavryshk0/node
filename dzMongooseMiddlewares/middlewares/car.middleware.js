const Car = require('../db/car.model');

const checkField = (req, res, next) => {
    try {
        const {model, year} = req.body;

        if (!model || !year) {
            res.json('Базові поля мають бути заповнені');
            return;
        }

        next();
    }
    catch (e) {
        res.json(e);
    }
};

const checkID = async (req, res, next) => {
    try {
        const {carID} = req.params;
        const isIDExist = await Car.findOne({_id:{carID}});

        if (!isIDExist) {
            res.status(404).json('Машинку не знайдено');
            return;
        }
        next();
    }
    catch (e) {
        res.json(e);
    }
}

const checkCarYear = async (req, res, next) => {
    try {
        const {year = ''} = req.body;

        if (year < 1980 && year > 2022)
        {
            res.status(409).json('Рік недійсний')
            return;
        }
        next()
    }
    catch (e) {
        res.json(e);
    }
}

module.exports = {
    checkField,
    checkID,
    checkCarYear
}