const Car = require("../db/car.model");

module.exports = {
    getAllCars: async (req, res) => {
        try {
            const cars = await Car.find();
            res.json(cars);
        }
        catch (e) {
            res.json(e);
        }
    },

    getCarByID: async (req, res) => {
        try {
            const {carID} = req.params;
            const car = await Car.findById(carID);

            if (!car) {
                res.status(404).json('Немає машинки під цим айді');
                return;
            }
            res.json(car);
        }
        catch (e) {
            res.json(e);
        }
    },

    addCar: async (req, res) => {
        try {
            const addCar = await Car.create(req.body);
            res.status(201).json(addCar);
        }
        catch (e) {
            res.json(e);
        }
    },

    updateCar: async (req, res) => {
        try {
            const {carID} = req.params;
            const car = await Car.findByIdAndUpdate(carID, req.body);

            res.status(200).json(car);
        }
        catch (e) {
            res.json(e);
        }
    },

    deleteCar: async (req, res) => {
        try {
            const { carID } = req.params;
            const cars = await Car.findByIdAndDelete(carID);

            if (!cars) {
                res.status(404).json('Немає машинки під цим айді');
                return;
            }
            res.status(204).send();
        }
        catch (e) {
            res.json(e);
        }
    },
};