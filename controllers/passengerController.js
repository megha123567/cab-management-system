const Passenger = require('../models/passenger');
// const { body, validationResult} = require('express-validator');

module.exports.index = (req, res, next)=>{
    Passenger.findAll().then(passengers=>{
        res.render('passenger-index',{
            data: passengers
        })
    })
}

module.exports.login = (req, res, next) => {
    res.render('login');
}

module.exports.loginPost = async (req, res, next) => {
    const { email, password } = req.body;
    const userFromDb = await Passenger.findOne({
        where: { email: email, password: password }
    });

    if (userFromDb == null) {
        return res.render('login', { message: 'No user with this email or password' })
        // console.log('user not find');
    }
    // console.log(userFromDb);
    // res.render('login');
    req.session.passengerId = userFromDb.passenger_id
    // console.log("Login post======");
    console.log(req.session.passengerId)


    res.redirect('/home');
}


module.exports.register = (req, res, next) => {
    res.render('register');
}

module.exports.registerPost = async (req, res, next) => {
    const { firstName, lastName, email, password, mobile, address, dob, gender } = req.body;
    let existingUser = await Passenger.findOne({
        where: {
            email: email,

        }
    });

    if (existingUser) {
        return res.render('register', { message: 'Already registered' });
    }

    await Passenger.create({
        fisrtName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
        address: req.body.address,
        dob: req.body.dob,
        gender: req.body.gender
    });

    // res.redirect('home');
    res.render('/cab')
}

module.exports.passengerUpdate = (req, res, next)=>{
    Passenger.findByPk(req.params.passenger_id)
    .then(user=>{
        res.render('passenger-update', {
            data: user
        })
    });
}

module.exports.passengerUpdatePost = async(req, res, next)=>{
    var user = await Passenger.findByPk(req.params.passenger_id);
    await Passenger.update({
        fisrtName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        mobile: req.body.mobile,
        address: req.body.address,
        dob: req.body.dob,
        gender: req.body.gender
    },
    {
        where: {passenger_id: req.params.passenger_id}
    })
    res.redirect('/home')
}

module.exports.passengerDelete = async(req, res, next)=>{
    let passengerid = req.params.passenger_id;
    let user = await Passenger.findByPk(passengerid);
    if(user){
        await Passenger.destroy({
            where: {
                passenger_id: passengerid
            }
        });
        res.redirect('/')
    }
}

module.exports.passengerProfile = (req, res, next)=>{
    res.render('passenger-profile',{
        data: req.identity.Passenger
    }
    )
}
















// module.exports.index = (req, res, next)=>{
//     Passenger.findAll().then(passengers=>{
//         res.render('passenger-index', {
//             data: passengers
//         });
//     })
// }

// module.exports.create = (req, res, next)=>{
//     res.render('Passenger-create');
// }

// module.exports.createPost = (req, res, next)=>{
//     Passenger.create({
//         fisrtName: req.body.firstname,
//         lastName: req.body.lastname,
    //     email: req.body.email,
    //     password: req.body.password,
    //     mobile: req.body.mobile,
    //     address: req.body.address,
    //     dob: req.body.dob,
    //     gender: req.body.gender
    // })
//     .then(user=>{
//         res.redirect("/");
//     })
// }