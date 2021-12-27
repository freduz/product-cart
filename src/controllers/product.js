import productService from '../services/product';
import csvHanlder from '../helpers/csv';

export const createProduct = async (req, res, next) => {
  const product = await productService().create(req.body, req.file);
  res.status(201).json({
    status: 'success',
    error: product.error,
    data: {
      product: product.body,
    },
  });
};

export const createFromCsv = async (req, res, next) => {
  const productData = await csvHanlder(req.file);
  const products = await productService().createFromCsv(productData);
  res.status(201).json({
    status: 'success',
    error: products.error,
    data: {
      products: products.body,
    },
  });
};

export const getProducts = async (req, res, next) => {
  const products = await productService().getAll();
  res.status(200).json({
    status: 'success',
    data: {
      products: products.body,
    },
  });
};

export const getProduct = async (req, res, next) => {
  const products = await productService().getOne(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      products: products.body,
    },
  });
};

export const deleteProduct = async (req, res, next) => {
  await productService().delete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: {
      data: null,
    },
  });
};

export const updateProduct = async (req, res, next) => {
  const product = await productService().update(req);
  res.status(200).json({
    status: 'success',
    data: {
      data: product.body,
    },
  });
};
