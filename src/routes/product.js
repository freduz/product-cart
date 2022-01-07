import express from 'express';
import {
  createProduct,
  createFromCsv,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct,
  exportProduct,
} from '../controllers/product';
import { productValidate } from '../middlewares/bodyValidator';
import FileUploadHandler from '../helpers/fileUpload';
import { protectedRoute } from '../middlewares/authMiddleware';

const upload = new FileUploadHandler(
  'product',
  'jpeg',
  'png',
  'jpg'
).getMulter();
const csvUpload = new FileUploadHandler('csv', 'csv').getMulter();

const router = express.Router();

export default () => {
  router.route('/export').get(exportProduct);
  router
    .route('/')
    .post(protectedRoute, upload.single('image'), createProduct)
    .get(getProducts);
  router
    .route('/csv-upload')
    .post(protectedRoute, csvUpload.single('csv'), createFromCsv);
  router
    .route('/:id')
    .delete(protectedRoute, deleteProduct)
    .get(protectedRoute, getProduct)
    .patch(protectedRoute, updateProduct);

  return router;
};
