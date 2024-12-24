import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
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
  confirmPassword: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "others"],
    required: true,
  },

  imageUrl: {
    type: String,
    required: true,
  },

  otp: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

export const User = mongoose.models.user || mongoose.model("user", UserSchema);
