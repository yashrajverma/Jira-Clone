const mongoose = require("mongoose");
const InProgressSchema = new mongoose.Schema({
  in_progress: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Tasks",
    },
  ],
  user_id: { type: mongoose.Types.ObjectId, ref: "User" },
});
module.exports = mongoose.model("InProgress", InProgressSchema);
