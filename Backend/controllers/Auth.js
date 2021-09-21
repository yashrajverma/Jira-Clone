const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_Secret = "Signing";
module.exports.signUp = async (req, res, next) => {
  const { email, password, name } = req.body;
  console.log(req.body);
  try {
    if (email == "" || password == "" || name == "") {
      res.json({ message: "Please Enter All Fields!!" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 12);
      let user = new User({
        email,
        password: hashedPassword,
        name,
        isVerified: true,
      });
      user = await user.save();
      res.json({ message: "Account Created Successfully!!" });
    }
  } catch {
    (err) => {
      console.log("Error", err);

      res.status(401).json({ Error: err });
    };
  }
};

module.exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    // console.log(user);
    if (user) {
      const isMatched = await bcrypt.compare(password, user.password);
      if (user.isVerified && isMatched) {
        const token = jwt.sign({ _id: user._id }, JWT_Secret);
        return res.json({ token });
      } else {
        return res.status(401).json({ error: "Password Doesn't Matched!!" });
      }
    } else {
      return res
        .status(400)
        .json({ error: "User Not found with this Email!!" });
    }
  } catch {
    (err) => {
      console.log("Error", err);
      return res.json({ error: err });
    };
  }
};

module.exports.getProfile = async (req, res, next) => {
  const { user } = req;
  try {
    if (user) {
      return res.json({ message: user });
    }
  } catch {
    (err) => {
      console.log(error, err);
      return res.json({ error: err });
    };
  }
};
