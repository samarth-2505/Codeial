const express = require('express');
const router = express.Router();

const friendshipsController = require('../controllers/friendships_controller');

router.get('/create',friendshipsController.create);
router.get('/remove',friendshipsController.remove);


module.exports = router;