const statsService = require('../services/statsService');

const handleRequest = (req, res) => {
    const { user_id, payload } = req.body;

    res.status(200).json({
        message: "Request accepted",
        user_id: user_id,
        payload: payload
    });
};

const getStats = (req, res) => {
    const stats = statsService.getAllStats();
    res.status(200).json(stats);
};

module.exports = {
    handleRequest,
    getStats
};
