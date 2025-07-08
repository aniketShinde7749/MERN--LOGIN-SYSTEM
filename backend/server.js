require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");


const app = express();
app.use(express.json());


const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://mern-login-system-osa3.vercel.app", // ✅ Add your Vercel frontend domain
    "https://mern-login-system.vercel.app"       // (Optional: if another deployment exists)
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Atlas connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


app.get("/", (req, res) => {
  res.send("API is running...");
});
