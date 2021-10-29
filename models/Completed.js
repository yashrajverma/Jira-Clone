const mongoose = require("mongoose");
const CompletedSchema = new mongoose.Schema({
  completed: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Tasks",
    },
  ],
  user_id: { type: mongoose.Types.ObjectId, ref: "User" },
});
module.exports = mongoose.model("Completed", CompletedSchema);
