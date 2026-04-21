const statsService = require('../services/statsService');

const rateLimiter = (req, res, next) => {
    const { user_id } = req.body;

    if (!user_id) {
        return res.status(400).json({
            error: "user_id is required"
        });
    }

    const isAllowed = statsService.processRateLimit(user_id, 5, 60000);

    if (!isAllowed) {
        return res.status(429).json({
            error: "Rate limit exceeded. Max 5 requests per minute."
        });
    }

    next();
};

module.exports = rateLimiter;
