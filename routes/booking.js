const express = require('express');
const controller = require('../controllers/bookingController');

const router = express.Router();


router.get('/', controller.bookingIndex);
router.get('/create/:cab_no', controller.bookingCreate);
router.post('/create/:cab_no', controller.bookingCreatePost);
router.get('/update/:booking_id', controller.bookingUpdate);
router.post('/update/:booking_id', controller.bookingUpdatePost);
router.get('/delete/:booking_id', controller.bookingdelete);
router.get('/payment/:cab_no', controller.payment);
router.get('/paymentInvoice/:cab_no', controller.paymentInvoice);

module.exports = router;