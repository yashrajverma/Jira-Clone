const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwt = require("jsonwebtoken");
const JWT_Secret = "Signing";

module.exports = async (req, res, next) => {
  const Authorization = req.headers.authorization;
  //   console.log("Authorization", req.headers.authorization);
  if (!Authorization) {
    console.log("In not authorization");
    return res.status(401).json({ error: "You Must be Logged In!!" });
  } else {
    const token = Authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_Secret, async (err, payload) => {
      if (err) {
        console.log("In not error");
        return res.json({ error: "You Must be Logged In!!" });
      }
      const { _id } = payload;
      let user = await User.findById(_id);
      if (user) {
        req.user = user;
        next();
      } else {
        return res
          .status(401)
          .json({ error: "No user with these credentials exist" });
      }
    });
  }
};
