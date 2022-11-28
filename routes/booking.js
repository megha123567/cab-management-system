const express = require('express');
const controller = require('../controllers/bookingController');

const router = express.Router();


router.get('/', controller.bookingIndex);
router.get('/create', controller.bookingCreate);
router.post('/create', controller.bookingCreatePost);
router.get('/update/:booking_id', controller.bookingUpdate);
router.post('/update/:booking_id', controller.bookingUpdatePost);
router.get('/delete/:booking_id', controller.bookingdelete);
router.get('/booking', controller.booking);
router.post('/booking', controller.booking);

module.exports = router;