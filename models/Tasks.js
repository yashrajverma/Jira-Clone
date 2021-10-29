const mongoose = require("mongoose");
const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user_id: { type: mongoose.Types.ObjectId, ref: "User" },
});
module.exports = mongoose.model("Tasks", TaskSchema);
