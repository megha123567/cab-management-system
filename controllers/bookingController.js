const Booking = require('../models/booking');

module.exports.bookingIndex = ( req, res, next)=>{
    Booking.findAll().then(booking=>{
        res.render('booking-index',{
            data: booking
        });
    });
}
module.exports.booking = (req, res, next)=>{
    res.render('booking');
}
module.exports.bookingpost = (req, res, next)=>{
    Booking.create({
        date_of_booking: req.body.dateofbooking, 
        cab_from: req.body.cabfrom,
        cab_to: req.body.cabto,
        booking_time: req.body.bookingtime, 
    })
    .then(user =>{
        res.redirect('/')
    })
}

module.exports.bookingCreate = (req, res, next)=>{
    res.render('booking-create');
}

module.exports.bookingCreatePost = (req, res, next)=>{
    Booking.create({
        // booking_id: req.body.bookingid, 
        date_of_booking: req.body.dateofbooking, 
        cab_from: req.body.cabfrom,
        cab_to: req.body.cabto,
        booking_time: req.body.bookingtime, 
        cab_no: req.body.cabno, 
        cost: req.body.cost, 
        passenger_id: req.body.passengerid, 
        driver_id: req.body.driverid
    })
    .then(user =>{
        res.redirect('/')
    })
}

module.exports.bookingUpdate = (req, res, next)=>{
    Booking.findByPk(req.params.booking_id)
    .then(user =>{
        res.render('booking-update', {
            data: user
        })
    });
}

module.exports.bookingUpdatePost = async(req, res, next)=>{
    var user = await Booking.findByPk(req.params.booking_id);
    await Booking.update({
        date_of_booking: req.body.dateofbooking, 
        cab_from: req.body.cabfrom,
        cab_to: req.body.cabto,
        booking_time: req.body.bookingtime, 
        cab_no: req.body.cabno, 
        cost: req.body.cost, 
        passenger_id: req.body.passengerid, 
        driver_id: req.body.driverid 
    },
    {
        where: {bookingid : req.params.booking_id}
    })
    res.redirect('/')
}

module.exports.bookingdelete = async(req, res, next)=>{
    let bookingid = req.params.booking_id;
    let user = await Booking.findByPk(bookingid);
    if(user){
        await Booking.destroy({
            where: {
                booking_id: bookingid
            }
        });
        res.redirect('/');
    }
}