const Tasks = require("../models/Tasks");
const InProgressSchema = require("../models/InProgress");
const CompletedSchema = require("../models/Completed");
const User = require("../models/User");

module.exports.AddTasks = async (req, res, next) => {
  const { title, description, user_id } = req.body;
  try {
    let user = await User.findOne({ _id: user_id });
    if (!user) {
      return res.status(404).json({ error: "User Doesn't Exists!!" });
    }
    let AddTask = new Tasks({
      title,
      description,
      user_id,
    });
    AddTask = await AddTask.save();
    user.tasks = AddTask._id;
    user = await user.save();
    res.json({ message: "Tasks is Successfully Added!!", AddTask });
  } catch {
    (err) => {
      console.log("error", err);
      return res.status(400).json({ error: err });
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
  const { _id } = req.user;

  try {
    let tasks = await Tasks.find({ user_id: _id });
    console.log(tasks);

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
  const { user_id, _id } = req.params;
  try {
    let tasks = await Tasks.findById({ user_id });
    let user = await User.findOne({ _id: user_id });
    if (user) {
      user.in_progress = [...user.in_progress, _id];
      user.tasks.pull(_id);
      // user.tasks.forEach((item) => {
      //   if (item._id == _id && !item.includes(tasks._id)) {
      //     item.push(tasks._id);
      //     // item.not_started = item.not_started.filter(
      //     //   (videoId) => videoId[0] !== id1
      //     // );
      //   }
      // });
      user = await user.save();
      res.json({ message: user });
    } else {
      return res.status(404).json({ error: "User not Exists!!" });
    }
  } catch {
    (err) => {
      return res.status(401).json({ error: err });
    };
  }
};
