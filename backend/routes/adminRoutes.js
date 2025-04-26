// routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdminMiddleware');

// Semua route di bawah ini hanya bisa diakses oleh admin
router.get('/dashboard', authMiddleware, isAdmin, adminController.getDashboard);
router.get('/users', authMiddleware, isAdmin, adminController.getAllUsers);
router.put('/users/:userId/role', authMiddleware, isAdmin, adminController.changeUserRole);

module.exports = router;
