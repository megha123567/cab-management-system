const Driver = require('../models/driver');


module.exports.driverIndex = (req, res, next)=>{
    Driver.findAll().then(drivers=>{
        res.render('driver-index', {
            data: drivers
        });
    })
}

module.exports.driverLogin = (req, res, next)=>{
    res. render('driver-login')
}

module.exports.driverLoginPost = async(req, res, next)=>{
    var Credentials = await Driver.findAll({where: {
        email: req.body.email,
        password: req.body.password
    }});

    if(Credentials.length == 0){
        return res.render('login',{message: 'invalid credentials'})
    }
    req.session.driverId = Credentials[0].dataValues.driver_id;
    req.session.role == 0;
    res.redirect('/home')
}
   


module.exports.driverRegister = (req, res, next)=>{
    res.render('driver-register');
}

module.exports.driverRegisterPost = (req, res, next)=>{
     Driver.create({
        driver_license_no: req.body.licenseno,
        driver_name: req.body.drivername,
        email: req.body.email,
        password: req.body.password,
        driver_mobile: req.body.drivermobile,
        driver_address: req.body.driveraddress,
        driver_dob: req.body.driverdob,
        driver_gender: req.body.drivergender
    })
    res.redirect('/driver/login')
}




module.exports.driverUpdate = (req, res, next)=>{
    Driver.findByPk(req.params.driver_id)
    .then(user =>{
        res.render('driver-update', {
            data: user
        })
    });
}

module.exports.driverUpdatePost = async(req, res, next)=>{
    var user = await Driver.findByPk(req.params.driver_id);
    await Driver.update(
        {
        driver_license_no: req.body.licenseno,
        driver_name: req.body.drivername,
        driver_email: req.body.driveremail,
        driver_password: req.body.driverpassword,
        driver_mobile: req.body.drivermobile,
        driver_address: req.body.driveraddress,
        driver_dob: req.body.driverdob,
        driver_gender: req.body.drivergender
        },
        {
            where: {driver_id : req.params.driver_id}
        }
    )
    res.redirect('/driver');
}

module.exports.driverDelete = async(req, res, next)=>{
    let driverid = req.params.driver_id;
    let user = await Driver.findByPk(driverid);
    if(user){
        await Driver.destroy({
            where: {
                driver_id : driverid
            }
        });
        res.redirect('/driver');
    }
}
