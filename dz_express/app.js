const express = require('express');
const app = express();
const {engine} = require('express-handlebars');
const dbUsers = require('./db/users');
const dbCars = require('./db/cars');

app.engine('.hbs', engine({defaultLayout: false}));
app.set('view engine', '.hbs');
app.set('views', './static');

app.listen(5000, () => {
    console.log('Done...');
})

app.get('/', (req, res) => {
    res.render('welcome');
})

app.get('/users', (req, res) => {
    res.render('users', {dbUsers});
})

app.get('/users/:userID', (req, res) => {
    const {userID} = req.params;
    const user = dbUsers[userID];

    if (!user) {
        res.status(404).json('Юзера не знайдено');
        return;
    }

    res.json(user.name);
});

app.get('/cars', (req, res) => {
    res.render('cars', {dbCars});
});

app.get('/cars/:carID', (req, res) => {
    const {carID} = req.params;
    const car = dbCars[carID];

    if (!car){
        res.status(404).json('Машину не знайдено');
        return;
    }

    res.json(car.model);
});