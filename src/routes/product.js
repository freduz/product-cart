import express from 'express';
import {
  createProduct,
  createFromCsv,
  getProducts,
  deleteProduct,
  getProduct,
  updateProduct,
} from '../controllers/product';
import { productValidate } from '../middlewares/bodyValidator';
import FileUploadHandler from '../helpers/fileUpload';

const upload = new FileUploadHandler(
  'product',
  'jpeg',
  'png',
  'jpg'
).getMulter();
const csvUpload = new FileUploadHandler('csv', 'csv').getMulter();

const router = express.Router();

export default () => {
  router
    .route('/')
    .post(upload.single('image'), createProduct)
    .get(getProducts);
  router.route('/csv-upload').post(csvUpload.single('csv'), createFromCsv);
  router
    .route('/:id')
    .delete(deleteProduct)
    .get(getProduct)
    .patch(updateProduct);

  return router;
};
