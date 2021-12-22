import Product from '../models/Product';

export default (model) => ({
  async create(productData) {
    try {
      const product = await Product.create(productData);
      return { error: false, body: product };
    } catch (err) {
      console.log(err);
    }
  },
});
