require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API Gateway запущен на порту ${PORT}`);
    console.log(`Перенаправляет запросы на бэкенд: ${process.env.BACKEND_URL}`);
});