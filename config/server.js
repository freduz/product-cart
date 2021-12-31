import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import Router from '../src/routes';
import databaseConfig from './database';
import errorHandler from '../src/helpers/errorHandler';
import { DATABASE, DATABASE_PASSWORD, COOKIE_SECRET } from './env';

const DB = DATABASE.replace('<password>', DATABASE_PASSWORD);

const server = express();
server.use(
  session({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: DB,
      ttl: 14 * 24 * 60 * 60,
      autoRemove: 'native',
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);

server.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = {
      items: [],
      totals: 0.0,
      formattedTotals: '',
    };
  }
  next();
});

server.use(express.json());
databaseConfig();
Router(server);

server.use(errorHandler);

export default server;
