const express = require('express');
const parser = require('body-parser');
const path = require('path');
const passengerRouter = require('./routes/passenger');
const indexRouter = require('./routes/index');
const cabRouter = require('./routes/cab');
const driverRouter = require('./routes/driver');
const bookingRouter = require('./routes/booking');
const homeRouter = require('./routes/home');
const paymnetRouter = require('./routes/payment');
const accountRouter = require('./routes/accounts');
const {engine} = require('express-handlebars');
const authMiddleware = require('./middlewares/authenticationMiddleware');
const cookieSession = require('cookie-session')


const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use("/", parser.urlencoded({extended: true}));

app.use(cookieSession({
    name: 'session',
    httpOnly: true,
    keys: ["asdfghjklasdfghjkl"],
    maxAge: 24 * 60 * 60 * 1000
}));

app.use(authMiddleware);
app.use(homeRouter);
app.use(passengerRouter);
app.use(indexRouter);
app.use(accountRouter);
app.use("/payment", paymnetRouter);
app.use("/cab", cabRouter);

app.use("/driver", driverRouter);
app.use("/booking", bookingRouter);

app.listen(80);