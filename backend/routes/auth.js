const express = require("express");
const router = express.Router();
const User = require("../models/User"); // used for user schema  ( mongodb database schema )
const bcrypt = require("bcryptjs"); // used for password hashing 

// Register Route
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  const user = new User({ email, password: hashed });

  await user.save();
  res.json({ message: "User registered" });
});



// Login Route

const jwt = require("jsonwebtoken");
const SECRET_KEY = "aniket_secret_123"; // You can put this in .env for better security

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);  // using bcrypt we hashed the password and now in this line we are comparing wtih hashed password using bcrypt.compare(password,user.password)
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  // Create token
  const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, { expiresIn: "2h" });

  res.json({ message: "Login successful", token });
});

module.exports = router;