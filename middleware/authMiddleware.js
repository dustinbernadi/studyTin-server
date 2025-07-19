const jwt = require("jsonwebtoken");
const User = require("../models/user"); // ⬅️ tambahkan ini
const SECRET_KEY = "studyTinSecret123"; // Sebaiknya pindah ke .env

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(decoded.id); // ⬅️ ambil user dari DB

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // ⬅️ simpan data lengkap ke req.user
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authenticateUser;
