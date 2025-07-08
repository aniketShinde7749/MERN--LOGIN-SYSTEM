const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/loginDB")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));


const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));

// in this program we connted with mongodb 

// we given route to it