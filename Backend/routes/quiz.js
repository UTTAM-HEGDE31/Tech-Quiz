const express = require('express');
const {
  getQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
} = require('../controllers/quizController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getQuizzes).post(protect, createQuiz);
router.route('/:id').get(getQuiz).put(protect, updateQuiz).delete(protect, deleteQuiz);
router.route('/:id/submit').post(protect, submitQuiz);

module.exports = router;