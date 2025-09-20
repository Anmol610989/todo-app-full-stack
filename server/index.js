const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/tasks")
const cors = require("cors")

mongoose
  .connect(
    "mongodb+srv://anmosingh48_db_user:anmol@cluster0.nvbhr6p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("Connected to mongoose"));
const port = 8000;
const app = express();
app.use(express.json())
app.use(cors())

app.use("/tasks", router)

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
