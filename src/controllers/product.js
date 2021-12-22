import productService from '../services/product';

export const createProduct = async (req, res, next) => {
  const product = await productService().create(req.body);
  res.status(201).json({
    status: 'success',
    error: product.error,
    data: {
      product: product.body,
    },
  });
};

export const createFromCsv = (req, res, next) => {
  console.log('inside the csv controller');
};
