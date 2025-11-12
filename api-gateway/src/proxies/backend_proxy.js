const httpProxy = require('http-proxy');
const { BACKEND_URL } = require('../config');
const logger = require('../services/logger');

const proxy = httpProxy.createProxyServer({
    target: BACKEND_URL,
    changeOrigin: true,
    ws: true, // для WebSocket/SSE
});

// Обработка ошибок прокси
proxy.on('error', (err, req, res) => {
    logger.error(`Proxy error: ${err.message}`);
    res.status(502).json({ error: 'Bad Gateway' });
});

// Специальная обработка для SSE
proxy.on('proxyReq', (proxyReq, req) => {
    if (req.path === '/api/availability/stream') {
        proxyReq.setHeader('Accept', 'text/event-stream');
        logger.debug('Setting up SSE proxy headers');
    }
});

module.exports = (req, res) => {
    logger.info(`Proxying ${req.method} ${req.path}`);
    proxy.web(req, res);
};