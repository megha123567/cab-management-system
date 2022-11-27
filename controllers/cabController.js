const Cab = require('../models/cab');

module.exports.index = (req, res, next) =>{
    Cab.findAll().then(cabs=>{
        res.render('cab-index', {
            data: cabs
        });
    })
}

module.exports.create = (req, res, next)=>{
    res.render('cab-create');
};

module.exports.createPost = (req, res, next)=>{
    Cab.create({
        // cab_no: req.body.cabNo,
        cab_name: req.body.cabName,
        cab_description: req.body.cabDescription,
        total_capacity: req.body.totalCapacity,
        driver_id: req.body.driverId
    })
    .then(user =>{
        res.redirect('/');
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
            driver_id: req.body.driverId  
        },
        {
            where: {cabNo : req.params.cab_no}
        }
    )
    res.redirect('/');
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
        res.redirect('/');
    }
}