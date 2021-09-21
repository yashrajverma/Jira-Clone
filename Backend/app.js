const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRouter = require("./routes/Auth");
const taskRouter = require("./routes/Tasks");
const PORT_ = process.env.PORT || 5000;

const MONGO_URI = `mongodb+srv://yashraj:DevAndJava@cluster0.pegch.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
app.use(express.json({ limit: "100mb" }));

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

app.use(authRouter);
app.use(taskRouter);
