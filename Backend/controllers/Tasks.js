const Tasks = require("../models/Tasks");
const InProgressSchema = require("../models/InProgress");
const CompletedSchema = require("../models/Completed");

module.exports.AddTasks = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    let AddTask = new Tasks({
      title,
      description,
    });
    AddTask = await AddTask.save();
    res.json({ message: "Tasks is Successfully Added!!", AddTask: [AddTask] });
  } catch {
    (err) => {
      return res.status(400).json({ error: err });
      console.log("error", err);
    };
  }
};
module.exports.DeleteTasks = async (req, res, next) => {
  const { _id } = req.params;
  try {
    let deleteTask = await Tasks.findByIdAndDelete(_id);
    // console.log(deleteTask);
    if (deleteTask) {
      return res.json({ message: "Task Deleted!!" });
    } else {
      return res.json({ error: "Error Occured!!" });
    }
  } catch {
    (err) => {
      console.log("error", err);
      return res.status(400).json({ error: err });
    };
  }
};
module.exports.GetTasks = async (req, res, next) => {
  try {
    let tasks = await Tasks.find();
    if (tasks) {
      return res.json({ message: tasks });
    } else {
      return res.status(401).json({ error: "Error Occured!!" });
    }
  } catch {
    (err) => {
      console.log("error", err);
      return res.status(400).json({ error: err });
    };
  }
};
module.exports.upDateTasks = async (req, res, next) => {
  const { _id, title, description } = req.body;
  try {
    await Tasks.findByIdAndUpdate(
      { _id },
      { title, description },
      {
        new: true,
      }
    )
      .then((result) => {
        console.log(result);
        res.json({ message: result });
      })
      .catch((err) => {
        console.log(err);
        res.json({ error: err });
      });
  } catch {
    (err) => {
      console.log("error", err);
      return res.status(400).json({ error: err });
    };
  }
};
module.exports.InProgress = async (req, res, next) => {
  const { _id } = req.body;
  try {
    let in_ProgressSave = await InProgressSchema.findById({ _id });
    if (in_ProgressSave) {
      in_ProgressSave = [...in_ProgressSave, in_ProgressSave];
      in_ProgressSave = await in_ProgressSave.save();
      res.json({ message: "Added in Progress" });
    }
    console.log(in_progress);
  } catch {
    (err) => {
      return res.status(401).json({ error: err });
    };
  }
};
