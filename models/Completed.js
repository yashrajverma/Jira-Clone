const mongoose = require("mongoose");
const CompletedSchema = new mongoose.Schema({
  completed: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Tasks",
    },
  ],
});
module.exports = mongoose.model("Completed", CompletedSchema);
