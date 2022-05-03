let dbCars = require("../db/cars");

module.exports = {
    getAllCars: (req, res) => {
        res.render('cars', {dbCars})
    },

    getCarByID:  (req, res) => {
        const {carID} = req.params;
        const car = dbCars[carID];

        if (!car) {
            res.status(404).json('Немає машинки під цим айді')
            return;
        }
        res.json(car.model);
    },

    addCar: (req, res) => {
        dbCars.push(req.body);
        res.json('Добавлено машину');
    },
    deleteCar: (req, res) => {
        const {carID} = req.params;
        const car = dbCars[carID];

        if (!car) {
            res.status(404).json('Немає машинки під цим айді');
            return;
        }
        dbCars = dbCars.filter(i => i.id !== Number(carID));
        res.send(dbCars);
    },

}