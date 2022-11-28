const express = require('express');
const controller = require('../controllers/indexController');

const router = express.Router();

router.get('/index', controller.index);
router.get('/aboutus', controller.aboutus);
router.get('/askedquestions', controller.askedQuestions);
router.get('/contactus', controller.contactus);
router.get('/payment', controller.payment);

module.exports = router;
