const Booking = require('../models/booking');
const Cab = require('../models/cab');
const Payment = require('../models/payment');


module.exports.bookingIndex = ( req, res, next)=>{
    Booking.findAll().then(booking=>{
        res.render('booking-index',{
            data: booking
        });
    });
}
// module.exports.booking = (req, res, next)=>{
//     Payment.findAll().then((payment)=>{
//         res.render('booking', {
//             Payment: payment
//         });
//     })
// }
module.exports.bookingCreate = (req, res, next)=>{
    Payment.findAll().then((payment)=>{
        // console.log('🚗🚗🚗🚗🚗🚗🚗')
        // console.log(payment)
        res.render('booking',{
            data: payment
        });
    })
    
}

module.exports.bookingCreatePost = (req, res, next)=>{
    Cab.findByPk(req.params.cab_no).then((data)=>{

        Payment.findOne(
            {where:{
                cab_from:req.body.cabfrom,
                cab_to: req.body.cabto
            }}
        ).then((paymentDetails)=>{
            Booking.create({
                // booking_id: req.body.bookingid, 
                date_of_booking: req.body.dateofbooking, 
                cab_from: req.body.cabfrom,
                cab_to: req.body.cabto,
                booking_time: req.body.bookingtime, 
                cab_no: req.params.cab_no, 
                cost: paymentDetails.cost,
                passenger_id: req.identity.Passenger.passenger_id, 
                driver_id: data.driver_id 
            })
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
    res.redirect('/booking')
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
        res.redirect('/booking');
    }
}


    module.exports.payment = async(req, res, next)=>{
        
        // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz88888888888888888888')
        
        console.log(req.params.booking_id)
        var payment = await Booking.findOne({where: {booking_id: req.params.booking_id}})
        // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz88888888888888888888')
        console.log(payment)
        res.render('payment',
        {
            data:payment
        })
    }

module.exports.paymentInvoice = async (req, res, next)=>{
    Booking.findOne({where: {booking_id: req.params.booking_id}})
    .then(result=>{
        let name = req.identity.Passenger.fisrtName + " " + req.identity.Passenger.lastName
        res.render('invoice',{
            invoice: result,
            name: name
        })
    })
}

module.exports.paymentDetails = async(req,res, next)=>{
    var paymentDetails = await Booking.findOne({where: {booking_id: req.params.booking_id}})
    // console.log(payment)
    res.render('payment-details',
    {
        data:paymentDetails
    })
}