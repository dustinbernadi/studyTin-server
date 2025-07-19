const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        // hanya untuk user yang daftar manual
    },
    googleId: {
        type: String,
        // hanya untuk user yang daftar dengan google
    },
    avatar: {
        type: String,
        default: '',
    },
    totalMinutes: {
        type: Number,
        default: 0, // total waktu belajar dalam menit
    },
    isPremium: {
        type: Boolean,
        default: false, // status premium
    },
    createdAt: {
        type: Date,
        default: Date.now, // tanggal pembuatan akun
    }
});

module.exports = mongoose.model("User", userSchema);