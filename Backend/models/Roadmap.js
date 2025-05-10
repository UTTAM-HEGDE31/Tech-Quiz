const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  url: {
    type: String,
    required: [true, 'Please add a URL'],
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL',
    ],
  },
  type: {
    type: String,
    enum: ['tutorial', 'documentation', 'course', 'video', 'book', 'article', 'project'],
    required: [true, 'Please specify resource type'],
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
  },
});

const TopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a topic name'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  resources: [ResourceSchema],
  projects: [
    {
      title: String,
      description: String,
      difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
      },
    },
  ],
});

const RoadmapSchema = new mongoose.Schema({
  domain: {
    type: String,
    required: [true, 'Please specify a domain'],
    trim: true,
  },
  level: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced', 'expert'],
    required: [true, 'Please specify level'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  timeEstimate: {
    type: String, // e.g., "4-6 weeks"
    required: [true, 'Please add a time estimate'],
  },
  topics: [TopicSchema],
  nextSteps: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Roadmap', RoadmapSchema);