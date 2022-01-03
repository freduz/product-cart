/* eslint-disable no-param-reassign */
import Product from '../models/Product';

export default () => ({
  async create(productData, imageFile, user) {
    productData.image = imageFile ? imageFile.filename : '';
    productData.uploadedBy = user.id;

    const product = await Product.create(productData);
    return { error: false, body: product };
  },

  async createFromCsv(productData) {
    const errorData = [];
    const resultData = [];
    for (let index = 0; index < productData.length; index++) {
      try {
        resultData.push(await Product.create(productData[index]));
      } catch (err) {
        errorData.push(productData[index]);
      }
    }
    if (errorData) throw Error(errorData);
  },

  async getAll() {
    const products = await Product.find();
    return { error: false, body: products };
  },

  // eslint-disable-next-line consistent-return
  async getOne(id) {
    const product = await Product.findById(id);
    return { error: false, body: product };
  },

  async update(req) {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    return { error: false, body: product };
  },

  async delete(id) {
    await Product.findByIdAndDelete(id);
    return { error: false, body: product };
  },
});
