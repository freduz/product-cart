import Product from '../models/Product';

export default () => ({
  async create(productData, imageFile) {
    try {
      productData.image = imageFile.filename;
      console.log(productData);
      const product = await Product.create(productData);
      return { error: false, body: product };
    } catch (err) {
      console.log(err);
    }
  },

  async createFromCsv(productData) {
    const errorData = [];
    const resultData = [];
    for (let index = 0; index < productData.length; index++) {
      try {
        // eslint-disable-next-line no-await-in-loop
        resultData.push(await Product.create(productData[index]));
      } catch (err) {
        errorData.push(productData[index]);
      }
    }
    if (errorData) throw Error(errorData);
  },

  async getAll() {
    try {
      const products = await Product.find();
      return { error: false, body: products };
    } catch (err) {}
  },

  // eslint-disable-next-line consistent-return
  async getOne(id) {
    try {
      const product = await Product.findById(id);
      return { error: false, body: product };
    } catch (err) {}
  },

  async update(req) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      return { error: false, body: product };
    } catch (err) {}
  },

  async delete(id) {
    try {
      await Product.findByIdAndDelete(id);
      return { error: false, body: product };
    } catch (err) {}
  },
});
