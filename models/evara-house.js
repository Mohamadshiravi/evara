import mongoose from "mongoose";
import evaraUserModel from "./evara-user";

const houseSchema = mongoose.Schema(
  {
    title: {
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
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "EvaraUser",
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

const evaraHouseModel =
  mongoose.models.EvaraHouse || mongoose.model("EvaraHouse", houseSchema);

export default evaraHouseModel;
