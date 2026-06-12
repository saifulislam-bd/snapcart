import mongoose, { Schema } from "mongoose";

interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  mobile: string;
  role: "user" | "admin" | "deliveryBoy";
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    mobile: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin", "deliveryBoy"],
      default: "user",
    },
  },
  { timestamps: true },
);

const User = mongoose.models.User ?? mongoose.model("User", userSchema);
export default User;
