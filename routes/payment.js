const express = require('express');
const controller = require('../controllers/paymentController');

const router = express.Router();

router.get('/index', controller.paymentIndex);
router.get('/create', controller.paymentCreate);
router.post('/create', controller.paymentCreatePost);
router.get('/update/:payment_id', controller.paymentUpdate);
router.post('/update/:payment_id', controller.paymentUpdatePost);
router.get('/delete/:payment_id', controller.paymentDelete);



module.exports = router;