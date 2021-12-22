import express from 'express';
import Router from '../src/routes';
import databaseConfig from './database';

const server = express();
server.use(express.json());
databaseConfig();
Router(server);

export default server;