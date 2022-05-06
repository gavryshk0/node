const express = require('express');
const {engine} = require('express-handlebars');
const mongoose = require('mongoose');
const app = express();

const carsRouter = require('./routes/car.router');
const userRouter = require('./routes/user.router');

const {PORT,MONGO} = require('./config/config');

app.engine('hbs', engine({defaultLayout: false}));
app.set('view engine', '.hbs');
app.set('views', './static');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/cars', carsRouter);
app.use('/users', userRouter);

mongoose.connect(MONGO).then(() => {
    console.log('Connection successful');
});

app.listen(PORT, () => {
    console.log('Done...');
});

app.get('/', (req, res) => {
    res.render('welcome');
});