// controllers/adminController.js
const { User, Post, Counseling } = require('../models');

exports.getDashboard = async (req, res) => {
  try {
    const userCount = await User.count();
    const postCount = await Post.count();
    const counselingCount = await Counseling.count();

    res.status(200).json({
      message: 'Welcome to the Admin Dashboard',
      stats: {
        totalUsers: userCount,
        totalPosts: postCount,
        totalCounselingRequests: counselingCount
      }
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({ attributes: ['id', 'name', 'email', 'role'] });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Failed to retrieve users', error: err.message });
  }
};

exports.changeUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.role = role;
    await user.save();

    res.status(200).json({ message: 'User role updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update role', error: err.message });
  }
};
