const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Please add a question'],
    trim: true,
  },
  options: {
    type: [String],
    required: [true, 'Please add options'],
  },
  correctAnswer: {
    type: Number, // Index of the correct option
    required: [true, 'Please specify the correct answer'],
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    required: [true, 'Please specify difficulty level'],
  },
  explanation: {
    type: String,
    required: [true, 'Please add an explanation for the answer'],
  },
});

const QuizSchema = new mongoose.Schema({
  domain: {
    type: String,
    required: [true, 'Please specify a domain'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  timeLimit: {
    type: Number, // in seconds
    required: [true, 'Please specify time limit'],
  },
  questions: [QuestionSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Quiz', QuizSchema);