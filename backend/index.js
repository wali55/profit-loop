const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("./models/Admin.js");
const Investor = require("./models/Investor.js");
const mongoose = require("mongoose");
const cors = require('cors'); // Import CORS





// connect db
mongoose
  .connect("mongodb+srv://walisantunu:WkNefBVfgtFPVYDD@cluster0.8cpsi.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb connected"))
  .catch((err) => console.error("mongodb connection error", err));

// Secret key for JWT
const JWT_SECRET = "my_jwt_secret_key";

const app = express();
app.use(express.json());
// Use CORS middleware
app.use(cors());

// auth middleware for protected routes
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(400).json({ error: "Invalid token" });
  }
};

// admin login route
app.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;

  // hardcoded admin credentials
  if (username === "admin" && password === "1516") {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    return res.json({ token, role: "admin" });
  }

  return res.status(401).json({ error: "Invalid credentials" });
});

// Investor registration route
app.post("/investor/register", async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  // Check if user already exists
  let investor = await Investor.findOne({ email });
  if (investor) {
    return res.status(400).json({ error: "User already exists" });
  }

  // hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  investor = new Investor({
    firstName,
    lastName,
    username,
    email,
    password: hashedPassword,
  });

  await investor.save();
  res.status(201).json({ message: "Investor registered successfully" });
});

// Investor login route
app.post("/investor/login", async (req, res) => {
  const { username, password } = req.body;

  const investor = await Investor.findOne({ username });
  if (!investor) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  // compare the password
  const isMatch = await bcrypt.compare(password, investor.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid credentials" });
  }

  // create jwt token
  const token = jwt.sign({ username: investor.username }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return res.json(token, { role: "investor" });
});

app.listen(3000, () => {
  console.log("listening to port 3000");
});
