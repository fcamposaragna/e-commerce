import express from 'express';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { engine } from 'express-handlebars';
import { Server } from 'socket.io';

import sessionRouter from './routes/sessions.js';
import cartRouter from './routes/cart.js';
import productRouter from './routes/products.js';
import initializePassport from './config/passport-config.js';
import logger from './utils/logger.js';
import {__dirname} from './dirname.js'

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT,()=>logger.info(`Listening on port ${PORT}`));
export const io = new Server(server);

app.engine('handlebars', engine())
app.set('views',__dirname+ '/views')
app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
initializePassport();
app.use(passport.initialize());
app.use(express.static(__dirname+'/public'));
app.use('/session',sessionRouter);
app.use('/api/carrito', cartRouter);
app.use('/api/productos', productRouter);