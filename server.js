const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/auth");
const cors = require("cors");

// Initialize Express app

const app = express();
const PORT = 3000;

//middleware
app.use(cors());
app.use(express.json());


// Set up routes
app.use("/api/auth", router);

// MongoDB connection
mongoose.connect(
  "mongodb+srv://dustinbernadi:dustin04042007@studytin-cluster.62tf6o7.mongodb.net/studytin?retryWrites=true&w=majority&appName=studyTin-cluster"
)
.then(() => console.log("MongoDB connected!"))
.catch(err => console.log("Connection error:", err));


app.get("/", (req, res) => {
  res.send("Server is running 🎉");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


//dustinbernadi // Replace <username> and <password> with your MongoDB credentials
//XPxyHXXBb4mHu9BH // Replace with your actual MongoDB connection string
