import mongoose from "mongoose";

const savedSchema = mongoose.Schema({
  house: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "House",
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const saveModel = mongoose.models.Save || mongoose.model("Save", savedSchema);

export default saveModel;
