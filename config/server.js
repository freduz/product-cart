import express from 'express';
import Router from '../src/routes';
import databaseConfig from './database';
import errorHandler from '../src/helpers/errorHandler';

const server = express();
server.use(express.json());
databaseConfig();
Router(server);

server.use(errorHandler);

export default server;
