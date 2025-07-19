
const bcrypt = require("bcrypt");

// Additional dependencies
const jwt = require("jsonwebtoken");
const User = require("../models/user");
// Middleware to authenticate user using JWT
const SECRET_KEY = "studyTinSecret123";

// Register a new user
const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Login a user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // bikin token berdasarkan user yang login
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        name: user.name,
        isPremium: user.isPremium,
      },
      SECRET_KEY,
      { expiresIn: "3d" } // Token expires in 3 days
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        totalMinutes: user.totalMinutes,
        isPremium: user.isPremium,
      },
    });
    console.log("User logged in:", user.name);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//update total minutes for a user

const updateTotalMinutes = async (req, res) => {
  try {
    const userId = req.user.id; // dari middleware
    const { minutesToAdd } = req.body;

    if (typeof minutesToAdd !== 'number' || minutesToAdd <= 0) {
      return res.status(400).json({ message: 'Invalid minutes' });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.totalMinutes += minutesToAdd;
    await user.save();

    res.status(200).json({ message: 'Minutes updated', newTotal: user.totalMinutes });
  } catch (err) {
    console.error('Update minutes error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user profile
const getProfile = async (req, res) => {
  console.log("GET /profile accessed");
  try {
    const user = await User.findById(req.user.id).select("name email totalMinutes");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Ekspor dua fungsi sekaligus
module.exports = {
  register,
  login,
  updateTotalMinutes,
  getProfile,
};

// Note: Ensure that you have the User model defined in "../models/user" with the necessary fields.
// The User model should include fields like name, email, password, avatar, totalMinutes,
// and isPremium as per your application's requirements.
