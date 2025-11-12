const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Конфигурация
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:8080';

// Middleware
app.use(cors());
app.use(express.json());

// Логирование запросов
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// Прокси для обычных API запросов
const apiProxy = createProxyMiddleware({
    target: BACKEND_URL,
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    },
    onProxyReq: (proxyReq, req) => {
        if (req.path === '/availability/stream') {
            proxyReq.setHeader('Accept', 'text/event-stream');
        }
    },
    onError: (err, req, res) => {
        console.error('Ошибка прокси:', err);
        res.status(502).json({ error: 'Сервис временно недоступен' });
    }
});

// Маршруты
app.use('/api', apiProxy);

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});

// Обработка ошибок
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Ошибка сервера' });
});

module.exports = app;