import mongoose from "mongoose";
import userModel from "./user";

const houseSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    room: {
      type: Number,
      required: true,
    },
    bathroom: {
      type: Number,
      required: true,
    },
    toilet: {
      type: Number,
      required: true,
    },
    floor: {
      type: Number,
      required: true,
    },
    meter: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
    },
    fileID: {
      type: [String],
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    queued: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const houseModel =
  mongoose.models.House || mongoose.model("House", houseSchema);

export default houseModel;
