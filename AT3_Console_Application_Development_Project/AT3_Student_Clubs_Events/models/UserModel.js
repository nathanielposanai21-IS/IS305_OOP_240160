const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true, trim: true },
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    userType: {
      type: String,
      enum: ["Student", "Club Administrator"],
      default: "Student",
    },
  },
  { timestamps: true },
);
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
