const Booking = require('../models/booking');
const Cab = require('../models/cab');


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
module.exports.bookingCreate = (req, res, next)=>{
    res.render('booking');
}

module.exports.bookingCreatePost = (req, res, next)=>{
    Cab.findByPk(req.params.cab_no).then((data)=>{
        // console.log(data.driver_id);
        // console.log('🚗🚗🚗🚗');
        // console.log(req.identity.Passenger)
        Booking.create({
            // booking_id: req.body.bookingid, 
            date_of_booking: req.body.dateofbooking, 
            cab_from: req.body.cabfrom,
            cab_to: req.body.cabto,
            booking_time: req.body.bookingtime, 
            cab_no: req.params.cab_no, 
            cost: data.dataValues.cost,
            passenger_id: req.identity.Passenger.passenger_id, 
            driver_id: data.driver_id 
        })
        .then(user =>{
            res.redirect('/booking/payment/'+req.params.cab_no)
        })
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


module.exports.payment = async(req, res, next)=>{
    var payment = await Booking.findOne({where: {cab_no: req.params.cab_no}})
    res.render('payment',
    {
        data:payment
    })
}

module.exports.paymentInvoice = async (req, res, next)=>{
    res.render('invoice')
}