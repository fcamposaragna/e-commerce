import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';

import sessionRouter from './routes/sessions.js';
import cartRouter from './routes/cart.js'
import initializePassport from './config/passport-config.js';
import logger from './utils/logger.js';

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,()=>logger.info(`Listening on port ${PORT}`));

app.use('/session',sessionRouter);
app.use('/api/carrito', cartRouter);
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());