const router = require("express").Router();
const Controller = require("../controllers/Auth");
const isAuth = require("../middleware/Auth");
router.post("/signUp", Controller.signUp);
router.post("/signIn", Controller.signIn);
router.get("/getProfile", isAuth, Controller.getProfile);
module.exports = router;
