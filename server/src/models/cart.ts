import mongoose, { Schema } from "mongoose";

export type TCartPosition = {
  product_id: string;
  user_id: string;
  quantity: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
};

const CartPositionSchema = new Schema<TCartPosition>({
  product_id: { type: String, required: true },
  user_id: { type: String, required: true },
  quantity: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image_url: { type: String, required: true },
});
const CartPosition = mongoose.model<TCartPosition>('CartPosition', CartPositionSchema)

export {CartPosition}
