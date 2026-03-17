require('dotenv').config();
const express = require('express');
const authRouter = require('./routes/auth-router');
const apiRouter = require('./routes/api-router');
const errorMiddleware = require('./middleware/error-middleware');

const app = express();

app.use(express.json());
app.use(authRouter);//  /auth
app.use(apiRouter);//   /api

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port www.localhost:${PORT}`));