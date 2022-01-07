/* eslint-disable no-param-reassign */
import fetch from 'node-fetch';
import Product from '../models/Product';
import { prodcutLogger } from '../utils/logger';

export default () => ({
  async create(productData, imageFile, user) {
    try {
      productData.image = imageFile ? imageFile.filename : '';
      productData.uploadedBy = user.id;

      const product = await Product.create(productData);
      return { error: false, body: product };
    } catch (err) {
      prodcutLogger.error(err);
      throw Error(err);
    }
  },

  async createFromCsv(productData) {
    const errorData = [];
    const resultData = [];
    for (let index = 0; index < productData.length; index++) {
      try {
        resultData.push(await Product.create(productData[index]));
      } catch (err) {
        prodcutLogger.error(err);
        errorData.push(productData[index]);
      }
    }
    if (errorData) throw Error(errorData);
  },

  async getAll() {
    try {
      const products = await Product.find();
      return { error: false, body: products };
    } catch (err) {
      prodcutLogger.error(err);
      throw Error(err);
    }
  },

  // eslint-disable-next-line consistent-return
  async getOne(id) {
    try {
      const product = await Product.findById(id);
      return { error: false, body: product };
    } catch (err) {
      prodcutLogger.error(err);
      throw Error(err);
    }
  },

  async update(req) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      return { error: false, body: product };
    } catch (err) {
      prodcutLogger.error(err);
      throw Error(err);
    }
  },

  async delete(id) {
    try {
      await Product.findByIdAndDelete(id);
      return { error: false, body: null };
    } catch (err) {
      prodcutLogger.error(err);
      throw Error(err);
    }
  },
});
