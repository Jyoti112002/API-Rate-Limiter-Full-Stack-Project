
const userStats = new Map();

const requestTimestamps = new Map();

/**
 * Retrieves statistics for all users.
 * @returns {Object} An object containing stats for each user.
 */
const getAllStats = () => {
    const statsObj = {};
    userStats.forEach((value, key) => {
        statsObj[key] = value;
    });
    return statsObj;
};

/**
 * Initializes stats for a user if they don't exist.
 * @param {string} userId 
 */
const initUser = (userId) => {
    if (!userStats.has(userId)) {
        userStats.set(userId, {
            totalRequests: 0,
            successRequests: 0,
            blockedRequests: 0
        });
    }
    if (!requestTimestamps.has(userId)) {
        requestTimestamps.set(userId, []);
    }
};

/**
 * Records a request and determines if it should be allowed based on rate limits.
 * @param {string} userId 
 * @param {number} limit - Max requests allowed
 * @param {number} windowMs - Time window in milliseconds
 * @returns {boolean} True if request is allowed, false otherwise.
 */
const processRateLimit = (userId, limit = 5, windowMs = 60000) => {
    initUser(userId);

    const now = Date.now();
    const timestamps = requestTimestamps.get(userId);
    const stats = userStats.get(userId);

    stats.totalRequests++;

    const validTimestamps = timestamps.filter(ts => now - ts < windowMs);

    if (validTimestamps.length < limit) {
        validTimestamps.push(now);
        requestTimestamps.set(userId, validTimestamps);
        stats.successRequests++;
        return true;
    } else {
        requestTimestamps.set(userId, validTimestamps);
        stats.blockedRequests++;
        return false;
    }
};

module.exports = {
    getAllStats,
    processRateLimit
};
