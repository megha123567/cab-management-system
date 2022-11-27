const express = require('express');
const controller = require('../controllers/adminController');

const router = express.Router();

router.get('/login', controller.adminLogin);
router.post('/login', controller.adminLoginPost);
router.get('/register', controller.adminRegister);
router.post('/register', controller.adminRegisterPost);


module.exports = router;