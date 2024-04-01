import mongoose, { Schema } from "mongoose";

type TOrderPosition = {
  product_id: string;
  quantity: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
} 

type TOrder = {
  status: string;
  user_id: string;
  created: number;
  status_modified: number;
  positions: TOrderPosition[];
};


const OrderPositionSchema = new Schema<TOrderPosition>({
  product_id: { type: String, required: true },
  quantity: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image_url: { type: String, required: true }
}, { _id: false })

const OrderSchema = new Schema<TOrder>({
  status: { type: String, required: true },
  user_id: { type: String, required: true },
  created: { type: Number, required: true },
  status_modified: { type: Number, required: true },
  positions: [OrderPositionSchema],
});
const Order = mongoose.model<TOrder>('Order', OrderSchema)

export {Order}
