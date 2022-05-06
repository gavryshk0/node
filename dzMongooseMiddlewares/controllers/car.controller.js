const Car = require("../db/car.model");

module.exports = {
    getAllCars: async (req, res) => {
        const cars = await Car.find();
        res.json(cars);
    },

    getCarByID: async (req, res) => {
        const {carID} = req.params;
        const car = await Car.findById(carID);

        if (!car) {
            res.status(404).json('Немає машинки під цим айді');
            return;
        }
        res.json(car);
    },

    addCar: async (req, res) => {
        const addCar = await Car.create(req.body);
        res.status(201).json(addCar);
    },

    deleteCar: async (req, res) => {
        const { carID } = req.params;
        const cars = await Car.findByIdAndDelete(carID);

        if (!cars) {
            res.status(404).json('Немає машинки під цим айді');
            return;
        }
        res.status(204).send();
    },
};