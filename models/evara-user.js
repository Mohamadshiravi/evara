import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

const evaraUserModel =
  mongoose.models.EvaraUser || mongoose.model("EvaraUser", userSchema);

export default evaraUserModel;
