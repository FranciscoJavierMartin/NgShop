import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name: String,
  image: String,
  countInStock: {
    type: Number,
    required: true,
  },
});

export const Product = model('Product', productSchema);
