import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    cart: {
      type: Object,
      required: true,
    },
  },
  { versionKey: false }
);
export const cartUserModel = mongoose.model("cartUser", schema);
