const express = require('express');
const {
  getQuizHistory,
  updateProfile,
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/history', protect, getQuizHistory);
router.put('/profile', protect, updateProfile);

module.exports = router;