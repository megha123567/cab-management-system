const Booking = require('../models/booking');
const Cab = require('../models/cab');
const { sequelize } = require('../models/db');
const Payment = require('../models/payment');


module.exports.bookingIndex = (req, res, next) => {
    Booking.findAll().then(booking => {
        res.render('booking-index', {
            data: booking
        });
    });
}

module.exports.bookingIndexPost = async (req, res, next) => {
    date = req.body.date

    let bookings = await Booking.findAll({
        where: {
            date_of_booking: date
        }
    })

    if (bookings.length != 0) {
        res.render('booking-index', {
            data: bookings
        })
    }
    else {
        // res.send('Not Found')
        let isFound = 1
        Booking.findAll().then(bookings => {
            res.render('booking-index', {
                data: bookings,
                found: isFound
            })

        })
    }
}
module.exports.bookingCreate =async(req, res, next) => {
    // Payment.findAll().then((payment) => {
    //     // console.log('🚗🚗🚗🚗🚗🚗🚗')
    //     // console.log(payment)
    //     res.render('booking', {
    //         data: payment
    //     });
    // })

    var payment = await Payment.findAll({});
    Payment.findAll({
        attributes: [
            [sequelize.fn('DISTINCT', sequelize.col('cab_from')), 'cab_from'],
    
        ]
    }).then(resultfrom=>{
        Payment.findAll({
            attributes: [
                [sequelize.fn('DISTINCT', sequelize.col('cab_to')), 'cab_to'],
        
            ]
        }).then(resultto=> {
            res.render('booking', {
                data: payment,
                pickup: resultfrom,
                cabto : resultto
            });
        })
       
    })


}

module.exports.bookingCreatePost = (req, res, next) => {
    Cab.findByPk(req.params.cab_no).then((data) => {

        Payment.findOne(
            {
                where: {
                    cab_from: req.body.cabfrom,
                    cab_to: req.body.cabto
                }
            }
        ).then((paymentDetails) => {
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
            }) .then(user => {
                res.redirect('/booking/payment/' + user.booking_id)
            })
        })

           
    })

}

module.exports.bookingUpdate = (req, res, next) => {
    Booking.findByPk(req.params.booking_id)
        .then(user => {
            res.render('booking-update', {
                data: user
            })
        });
}

module.exports.bookingUpdatePost = async (req, res, next) => {
    var user = await Booking.findByPk(req.params.booking_id);
    var loc = await Payment.findOne({where:{cab_from: req.body.cabfrom}})
    // console.log('111111111111111111111111111111111111111111111111111111111111')
    // console.log(loc)
    await Booking.update({
        date_of_booking: req.body.dateofbooking,
        cab_from: req.body.cabfrom,
        cab_to: req.body.cabto,
        booking_time: req.body.bookingtime,
        cab_no: req.body.cabno,
        cost: loc.dataValues.cost,
        passenger_id: req.body.passengerid,
        driver_id: req.body.driverid
    },
        {
            where: { booking_id: req.params.booking_id }
        })
    res.redirect('/booking/payment/' + user.dataValues.booking_id)
}

module.exports.bookingdelete = async (req, res, next) => {
    let bookingid = req.params.booking_id;
    console.log('2345678545' + bookingid)
    let user = await Booking.findByPk(bookingid);
    if (user) {
        Booking.destroy({
            where: {
                booking_id: bookingid
            }
        });
        res.redirect('/cab/cabavailable');
    }
}


module.exports.payment = async (req, res, next) => {

    // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz88888888888888888888')

    console.log(req.params.booking_id)
    var payment = await Booking.findOne({ where: { booking_id: req.params.booking_id } })
    // console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzz88888888888888888888')
    // console.log(payment)
    res.render('payment',
        {
            data: payment
        })
}

module.exports.paymentInvoice = async (req, res, next) => {
    Booking.findOne({ where: { booking_id: req.params.booking_id } })
        .then(result => {
            let name = req.identity.Passenger.fisrtName + " " + req.identity.Passenger.lastName
            res.render('invoice', {
                invoice: result,
                name: name
            })
        })
}

module.exports.paymentDetails = async (req, res, next) => {
    var paymentDetails = await Booking.findOne({ where: { booking_id: req.params.booking_id } })
    // console.log(payment)
    res.render('payment-details',
        {
            data: paymentDetails
        })
}