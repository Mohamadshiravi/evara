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
    default: "/images/guest.jpg",
  },
  fileID: {
    type: String,
  },
  refreshToken: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.models.User || mongoose.model("User", userSchema);

export default userModel;
