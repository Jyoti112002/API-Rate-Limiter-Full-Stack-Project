const express = require('express');
const router = express.Router();
const requestController = require('../controllers/requestController');
const rateLimiter = require('../middleware/rateLimiter');

router.post('/request', rateLimiter, requestController.handleRequest);

router.get('/stats', requestController.getStats);

module.exports = router;
