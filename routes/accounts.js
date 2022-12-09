const express = require('express');

const Controller = require('../controllers/accountController');
const router = express.Router();

router.get('/logout', Controller.logout);

module.exports = router;