/* eslint-disable func-names */
import mongoose from 'mongoose';
import slugify from 'slugify';

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title should be provided'],
  },
  price: {
    type: Number,
    required: [true, 'Product price is mandatory'],
  },
  quantity: {
    type: Number,
    required: true,
  },
  image: String,
  slug: String,
});

productSchema.pre('save', function (next) {
  this.slug = slugify(this.title);
  next();
});

export default mongoose.model('Product', productSchema);
