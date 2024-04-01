import mongoose, { Schema } from "mongoose";

export type TProduct = {
  name: string;
  description: string;
  image_url: string;
  price: number;
  created: number;
}

const ProductSchema = new Schema<TProduct>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  image_url: { type: String, required: true },
  price: { type: Number, required: true },
  created: { type: Number, required: true }
});
const Product = mongoose.model<TProduct>('Product', ProductSchema)

export {Product}
