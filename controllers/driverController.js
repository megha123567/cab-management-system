const Driver = require('../models/driver');


module.exports.driverIndex = (req, res, next)=>{
    Driver.findAll().then(drivers=>{
        res.render('driver-index', {
            data: drivers
        });
    })
}

module.exports.driverRegister = (req, res, next)=>{
    res.render('driver-register');
}

module.exports.driverRegisterPost = (req, res, next)=>{
    // const {licenseno, drivername, driveremail, driverpassword, drivermobile, driveraddress, driverdob, drivergender} = req.body;
    // let existingUser = await Driver.findOne({
    //     where: {
    //         driver_email: driveremail,
    //     }
    // });
    // if(existingUser){
    //     return req.render('driver-register', {message: 'Already registered'})
    // }
     Driver.create({
        driver_license_no: req.body.licenseno,
        driver_name: req.body.drivername,
        driver_email: req.body.driveremail,
        driver_password: req.body.driverpassword,
        driver_mobile: req.body.drivermobile,
        driver_address: req.body.driveraddress,
        driver_dob: req.body.driverdob,
        driver_gender: req.body.drivergender
    });
    res.redirect('/driver')
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
            where: {driverid : req.params.driver_id}
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
