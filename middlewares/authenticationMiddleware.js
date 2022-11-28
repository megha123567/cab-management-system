const Passenger = require('../models/passenger');


module.exports = async (req, res, next) => {
    req.identity = {
        isAuthenticated: false,
        Passenger: null
    }
    // console.log('🚗')
    if (req.url == "/login"  || req.url == "/register" ) {
    console.log('🚗')

        return next();
    }
    let passengerId = req.session.passengerId;
    console.log('🚗🚗')
    console.log(passengerId)
    if (!passengerId || passengerId == null) {
        return res.redirect("/login");
    }

    let userFromDb = await Passenger.findByPk(passengerId);
    if (userFromDb == null) {
        return res.redirect("/login");
    }

    req.identity.isAuthenticated = true;
    req.identity.Passenger = {
        passenger_id: userFromDb.dataValues.passengerId,
        fisrtName: userFromDb.dataValues.firstName,
        lastName: userFromDb.dataValues.lastName,
        email: userFromDb.dataValues.email,
        password: userFromDb.dataValues.password,
        mobile: userFromDb.dataValues.mobile,
        address: userFromDb.dataValues.address,
        dob: userFromDb.dataValues.dob,
        gender: userFromDb.dataValues.gender,
        role: 'Passenger'
    }
    next();
}



