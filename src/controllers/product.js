import productService from '../services/product';
import csvHanlder from '../helpers/csv';
import catchAsync from '../helpers/catchAsync';

export const createProduct = catchAsync(async (req, res, next) => {
  const product = await productService().create(req.body, req.file, req.user);
  res.status(201).json({
    status: 'success',
    error: product.error,
    data: {
      product: product.body,
    },
  });
});

export const createFromCsv = catchAsync(async (req, res, next) => {
  const productData = await csvHanlder(req.file, req.user);
  const response = await productService().createFromCsv(productData);
});

export const getProducts = catchAsync(async (req, res, next) => {
  const products = await productService().getAll();
  res.status(200).json({
    status: 'success',
    data: {
      products: products.body,
    },
  });
});

export const getProduct = catchAsync(async (req, res, next) => {
  const products = await productService().getOne(req.params.id);
  res.status(200).json({
    status: 'success',
    data: {
      products: products.body,
    },
  });
});

export const deleteProduct = catchAsync(async (req, res, next) => {
  await productService().delete(req.params.id);
  res.status(204).json({
    status: 'success',
    data: {
      data: null,
    },
  });
});

export const updateProduct = catchAsync(async (req, res, next) => {
  const product = await productService().update(req);
  res.status(200).json({
    status: 'success',
    data: {
      data: product.body,
    },
  });
});

export const exportProduct = catchAsync(async (req, res) => {
  productService().exportData();
});
