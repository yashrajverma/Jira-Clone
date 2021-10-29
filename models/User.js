const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String },
  isVerified: { type: Boolean, default: false },
  tasks: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Tasks",
    },
  ],
  in_progress: [
    {
      type: mongoose.Types.ObjectId,
      ref: "InProgress",
    },
  ],
  completed: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Completed",
    },
  ],
});
module.exports = mongoose.model("User", UserSchema);
