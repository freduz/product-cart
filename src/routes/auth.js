import express from 'express';
import { login, signUp } from '../controllers/auth';

const router = express.Router();

export default () => {
  router.post('/signup', signUp);
  router.post('/login', login);
  return router;
};
