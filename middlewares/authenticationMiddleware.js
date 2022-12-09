const Passenger = require('../models/passenger');
const driver = require('../models/driver');
const Driver = require('../models/driver');

module.exports = async (req, res, next) => {
    req.identity = {
        isAuthenticated: false,
        Passenger: null,
        // Driver: null
    }

    var role = req.session.role
    console.log('my role is '+ role)
    if(req.session.role == 1){
        if (req.url == "/login"  || req.url == "/register" ) {
            return next();
    }
    let passengerId = req.session.passengerId;
    console.log('my passengerid is '+ passengerId)
    if (!passengerId || passengerId == null) {
        return res.redirect("/login");
    }
    let userFromDb = await Passenger.findByPk(passengerId);
    if (userFromDb == null) {
        return res.redirect("/login");
    }
    req.identity.isAuthenticated = true;
    req.identity.Passenger = {
        passenger_id: userFromDb.dataValues.passenger_id,
        fisrtName: userFromDb.dataValues.fisrtName,
        lastName: userFromDb.dataValues.lastName,
        email: userFromDb.dataValues.email,
        password: userFromDb.dataValues.password,
        mobile: userFromDb.dataValues.mobile,
        address: userFromDb.dataValues.address,
        dob: userFromDb.dataValues.dob,
        gender: userFromDb.dataValues.gender,
        role: userFromDb.dataValues.role
    }
    next();

    }

    else{
        if(req.url == '/login' || req.url == '/create' || req.url == '/driver/login' || req.url == '/driver/register' || req.url == '/index'){
            return next();
        }

        let driverId = req.session.driverId;
        if(!driverId || driverId == null){
            return res.redirect("/driver/login");
        }
        let userFromDb = await Driver.findByPk(driverId);
        if( userFromDb == null){
            return res.redirect('/driver/login');
        }

        

        req.identity.isAuthenticated = true;
        req.identity.Driver = {
            driver_license_no: userFromDb.dataValues.licenseno,
            driver_name: userFromDb.dataValues.drivername,
            email: userFromDb.dataValues.email,
            password: userFromDb.dataValues.password,
            driver_mobile: userFromDb.dataValues.drivermobile,
            driver_address: userFromDb.dataValues.driveraddress,
            driver_dob: userFromDb.dataValues.driverdob,
            driver_gender: userFromDb.dataValues.drivergender
        }
       
        }
    }