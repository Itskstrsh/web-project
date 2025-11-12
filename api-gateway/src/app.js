const jwt = require('jsonwebtoken');
const logger = require('../services/logger');

module.exports = (req, res, next) => {
    // Пропускаем публичные эндпоинты
    if (['/api/products', '/api/availability/stream'].includes(req.path)) {
        return next();
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        logger.warn('Unauthorized request attempt');
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        logger.warn(`Invalid token: ${err.message}`);
        res.status(403).json({ error: 'Invalid token' });
    }
};