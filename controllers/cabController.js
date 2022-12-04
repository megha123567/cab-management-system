const Cab = require('../models/cab');
const Driver = require('../models/driver');

module.exports.index = (req, res, next) =>{
    Cab.findAll().then(cabs=>{
        res.render('cab-index', {
            data: cabs
        });
    })
}


module.exports.create = (req, res, next)=>{
    // res.render('cab-create');
    Driver.findAll().then((driver)=>{
        console.log(driver)
        res.render('cab-create', {
            driverName : driver
        })
    })
};

module.exports.createPost = (req, res, next)=>{
    var temp = req.body.drivername;
    console.log('🛺🚕🚕🚕🚓')
    console.log(temp)
    var new_temp = temp.split(':');

    console.log(new_temp);
    Cab.create({
        // cab_no: req.body.cabNo,
        cab_name: req.body.cabName,
        cab_description: req.body.cabDescription,
        total_capacity: req.body.totalCapacity,
        driver_id: new_temp[1],
        // cost: req.body.cost
    })
    .then(user =>{
        res.redirect('/cab');
    })
}

module.exports.update = (req, res, next) =>{
    Cab.findByPk(req.params.cab_no)
    .then(user =>{
        res.render('cab-update',{
            data: user
        })
    });
}

module.exports.updatePost = async(req, res, next)=>{
    var user = await Cab.findByPk(req.params.cab_no);
    await Cab.update(
        {
            cab_name: req.body.cabName,
            cab_description: req.body.cabDescription,
            total_capacity: req.body.totalCapacity,
            driver_id: req.body.driverId ,
            // cost: req.body.cost
        },
        {
            where: {cab_no : req.params.cab_no}
        }
    )
    res.redirect('/cab');
}

module.exports.delete = async(req, res, next)=>{
    let cabNo = req.params.cab_no;
    let user = await Cab.findByPk(cabNo);
    if(user){
        await Cab.destroy({
            where: {
                cab_no : cabNo
            }
        });
        res.redirect('/cab');
    }
}


module.exports.cabAvailable = (req, res, next)=>{
    // res.render('cab-available');

    Cab.findAll().then(cabs=>{
        res.render('cab-available', {
            data: cabs,
            cab: req.identity.Passenger,
        });
    })

}