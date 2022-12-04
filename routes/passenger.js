const express = require('express');
const controller = require('../controllers/passengercontroller');

const router = express.Router();

router.get('/login', controller.login);
router.post('/login', controller.loginPost);
router.get('/register', controller.register);
router.post('/register', controller.registerPost);
router.get('/profile', controller.passengerProfile);

router.get('/',controller.index);
router.get('/update/:passenger_id', controller.passengerUpdate);
router.post('/update/:passenger_id', controller.passengerUpdatePost);
router.get('/delete/:passenger_id', controller.passengerDelete)


module.exports = router;