import express from 'express';
import {
  createUser,
  deleteUser,
  getAllUser,
  getUser,
  updateUser,
} from '../controllers/user';
import FileUploadHandler from '../helpers/fileUpload';
import { userValidate } from '../middlewares/bodyValidator';

const upload = new FileUploadHandler(
  'user',
  'product',
  'jpeg',
  'png',
  'jpg'
).getMulter();

const router = express.Router();

export default () => {
  router
    .route('/')
    .post(upload.single('image'), userValidate, createUser)
    .get(getAllUser);
  router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);
  return router;
};
