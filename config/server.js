import express from 'express';
import Router from '../src/routes';
import databaseConfig from './database';

const server = express();
server.use(express.json());
databaseConfig();
Router(server);

server.use((err, req, res, next) => {
  console.log(err);
});

export default server;
