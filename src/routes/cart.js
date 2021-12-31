import express from 'express';
import { addToCart, getCartItems } from '../controllers/cart';

const router = express.Router();

export default () => {
  router.post('/:id', addToCart);
  router.get('/', getCartItems);
  return router;
};
