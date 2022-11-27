const express = require('express');
const controller = require('../controllers/cabController');

const router = express.Router();

router.get('/', controller.index);
router.get('/create', controller.create);
router.post('/create', controller.createPost);
router.get('/update/:cab_no', controller.update);
router.post('/update/:cab_no', controller.updatePost);
router.get('/delete/:cab_no', controller.delete);


module.exports = router;