const mongoose = require("mongoose");
const InProgressSchema = new mongoose.Schema({
  in_progress: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Tasks",
    },
  ],
});
module.exports = mongoose.model("InProgress", InProgressSchema);
