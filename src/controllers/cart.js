import productService from '../services/product';
import Cart from '../services/cart';

export const addToCart = async (req, res, next) => {
  const product = await productService().getOne(req.params.id);
  const { quantity } = req.body;
  let cart = req.session.cart ? req.session.cart : null;

  Cart.addToCart(product.body, parseInt(quantity, 10), cart);
};
