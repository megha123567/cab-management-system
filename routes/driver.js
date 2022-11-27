const express = require('express');
const controller = require('../controllers/driverController');

const router = express.Router();

router.get('/login', controller.driverLogin);
router.post('/login', controller.driverLoginPost);
router.get('/register', controller.driverRegister);
router.post('/register', controller.driverRegisterPost);
router.get('/', controller.driverIndex);
router.get('/update/:driver_id', controller.driverUpdate);
router.post('/update/:driver_id', controller.driverUpdatePost);
router.get('/delete/:driver_id', controller.driverDelete)



module.exports = router;