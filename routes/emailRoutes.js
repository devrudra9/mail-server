const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// Routes for sending and receiving emails
router.post('/send', emailController.sendEmail);
router.get('/inbox/:userId', emailController.getInbox);

module.exports = router;