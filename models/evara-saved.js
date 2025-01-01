import mongoose from "mongoose";

const savedSchema = mongoose.Schema({
  house: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "EvaraHouse",
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "EvaraUser",
  },
});

const evaraSaveModel =
  mongoose.models.EvaraSaved || mongoose.model("EvaraSaved", savedSchema);

export default evaraSaveModel;
