const router = require("express").Router();
const Controller = require("../controllers/Tasks");
const isAuth = require("../middleware/Auth");

router.post("/addTasks", isAuth, Controller.AddTasks);
router.get("/getTasks", isAuth, Controller.GetTasks);
router.delete("/deleteTasks/:_id", isAuth, Controller.DeleteTasks);
router.post("/updateTasks", isAuth, Controller.upDateTasks);

module.exports = router;
