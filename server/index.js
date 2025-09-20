const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/tasks")
const cors = require("cors")
require("dotenv").config()


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to mongoose"));
const port = 8000;
const app = express();
app.use(express.json())
app.use(cors())

app.use("/tasks", router)

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
