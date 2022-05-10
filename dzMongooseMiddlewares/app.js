const express = require('express');
const {engine} = require('express-handlebars');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const ApiError = require('./error/ApiError');
const carRouter = require('./routes/car.router');
const userRouter = require('./routes/user.router');

const {PORT, MONGO_URL} = require('./config/config');

app.engine('hbs', engine({defaultLayout: false}));
app.set('view engine', '.hbs');
app.set('views', './static');

mongoose.connect(MONGO_URL).then(() => {
  console.log('Connection successful');
});

app.use('/cars', carRouter);
app.use('/users', userRouter);
app.use('*', _ErrorNotFoundHandler);
app.use(_MainErrorHandler);

function _ErrorNotFoundHandler(req, res, next) {
  next(new ApiError('Not found', 404));
}

function _MainErrorHandler(err, req, res, next) {
  res
    .status(err.status || 500)
    .json({
      message: err.message || 'Server error',
      status: err.status,
      data: {}
    })
}

app.listen(PORT, () => {
  console.log('Done...');
});
