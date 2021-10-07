const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./routes/Auth");
const taskRouter = require("./routes/Tasks");
const PORT_ = process.env.PORT || 5001;
const cors = require("cors");
const MONGO_URI = `mongodb+srv://yashraj:DevAndJava@cluster0.pegch.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
app.use(express.json({ limit: "105mb" }));
app.use(cors());
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //   useFindAndModify: false,
  //   useCreateIndex: true,
});
let conn = mongoose.connection.on("connected", (res) => {
  console.log("Connected to MongoDB");
  app.listen(PORT_, () => {
    console.log("Server Listening on Port", PORT_);
  });
});
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
app.use(authRouter);
app.use(taskRouter);
