import mongoose, { Schema } from "mongoose"

type TUser = {
    email: string
    password: string
    first_name: string
    last_name: string
    phone_number: string
}

const UserSchema = new Schema<TUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  phone_number: { type: String, required: true }
});
const UserModel = mongoose.model<TUser>('User', UserSchema)

export {UserSchema, UserModel}
