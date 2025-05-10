const express = require('express');
const {
  getRoadmaps,
  getRoadmap,
  createRoadmap,
  updateRoadmap,
  deleteRoadmap,
} = require('../controllers/roadmapController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getRoadmaps).post(protect, createRoadmap);
router.route('/:id').put(protect, updateRoadmap).delete(protect, deleteRoadmap);
router.route('/:domain/:level').get(getRoadmap);

module.exports = router;