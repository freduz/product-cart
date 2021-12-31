import productService from '../services/product';
import Cart from '../services/cart';

export const addToCart = async (req, res, next) => {
  const product = await productService().getOne(req.params.id);
  const { quantity } = req.body;
  let cart = req.session.cart ? req.session.cart : null;
  Cart.addToCart(product.body, parseInt(quantity), cart);

  res.status(200).json({
    status: 'success',
    message: req.session.cart,
  });
};

export const getCartItems = async (req, res, next) => {
  console.log('sdfdsdsgs');
  console.log(req.session.cart);
};
