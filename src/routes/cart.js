import express from 'express';
import { addToCart } from '../controllers/cart';

const router = express.Router();

export default () => {
  router.post('/add-cart/:id', addToCart);
  return router;
};
