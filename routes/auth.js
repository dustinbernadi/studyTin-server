const express = require('express');
const router = express.Router();
const { register, login, updateTotalMinutes, getProfile } = require('../controllers/authController');
const authenticateUser = require('../middleware/authMiddleware');


// route untuk register
router.post('/register', register);

// route untuk login
router.post('/login', login);

// route untuk mendapatkan profil user (hanya untuk user yang sudah login)
router.get('/profile', authenticateUser, getProfile);

// route untuk update total minutes (hanya untuk user yang sudah login)
router.patch('/update-minutes', authenticateUser,updateTotalMinutes);

module.exports = router;