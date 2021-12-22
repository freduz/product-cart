import express from 'express';
import { createProduct } from '../controllers/product';

const router = express.Router();

export default () => {
  router.route('/').post(createProduct);

  return router;
};
