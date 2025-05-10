const Quiz = require('../models/Quiz');
const User = require('../models/User');

// @desc    Get all quizzes
// @route   GET /api/quizzes
// @access  Public
exports.getQuizzes = async (req, res, next) => {
  try {
    // Exclude questions to prevent cheating
    const quizzes = await Quiz.find().select('-questions.correctAnswer -questions.explanation');

    res.status(200).json({
      success: true,
      count: quizzes.length,
      data: quizzes,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get single quiz
// @route   GET /api/quizzes/:id
// @access  Public
exports.getQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id).select('-questions.correctAnswer -questions.explanation');

    if (!quiz) {
      return res.status(404).json({
        success: false,
        error: 'Quiz not found',
      });
    }

    res.status(200).json({
      success: true,
      data: quiz,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new quiz
// @route   POST /api/quizzes
// @access  Private (Admin)
exports.createQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.create(req.body);

    res.status(201).json({
      success: true,
      data: quiz,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update quiz
// @route   PUT /api/quizzes/:id
// @access  Private (Admin)
exports.updateQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!quiz) {
      return res.status(404).json({
        success: false,
        error: 'Quiz not found',
      });
    }

    res.status(200).json({
      success: true,
      data: quiz,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete quiz
// @route   DELETE /api/quizzes/:id
// @access  Private (Admin)
exports.deleteQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        error: 'Quiz not found',
      });
    }

    await quiz.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Submit quiz answers & get results
// @route   POST /api/quizzes/:id/submit
// @access  Private
exports.submitQuiz = async (req, res, next) => {
  try {
    const { answers, timeTaken } = req.body;
    
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide answers',
      });
    }

    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        success: false,
        error: 'Quiz not found',
      });
    }

    // Calculate score
    let score = 0;
    const results = [];

    for (let i = 0; i < answers.length; i++) {
      const userAnswer = answers[i];
      const question = quiz.questions[userAnswer.questionIndex];
      
      if (!question) {
        return res.status(400).json({
          success: false,
          error: `Question at index ${userAnswer.questionIndex} not found`,
        });
      }

      const isCorrect = userAnswer.answer === question.correctAnswer;
      
      if (isCorrect) {
        score++;
      }

      results.push({
        questionIndex: userAnswer.questionIndex,
        isCorrect,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
      });
    }

    // Calculate percentage
    const percentage = (score / quiz.questions.length) * 100;
    
    // Determine badge
    let badge = 'Beginner';
    if (percentage >= 90) {
      badge = 'Expert';
    } else if (percentage >= 75) {
      badge = 'Advanced';
    } else if (percentage >= 50) {
      badge = 'Intermediate';
    }

    // Add to user's quiz history
    if (req.user) {
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          quizHistory: {
            domain: quiz.domain,
            score,
            totalQuestions: quiz.questions.length,
            timeTaken,
            badge,
          },
        },
      });
    }

    res.status(200).json({
      success: true,
      data: {
        score,
        totalQuestions: quiz.questions.length,
        percentage,
        badge,
        results,
      },
    });
  } catch (err) {
    next(err);
  }
};