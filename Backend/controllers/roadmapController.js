const Roadmap = require('../models/Roadmap');

// @desc    Get all roadmaps
// @route   GET /api/roadmaps
// @access  Public
exports.getRoadmaps = async (req, res, next) => {
  try {
    const roadmaps = await Roadmap.find();

    res.status(200).json({
      success: true,
      count: roadmaps.length,
      data: roadmaps,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get specific roadmap by domain and level
// @route   GET /api/roadmaps/:domain/:level
// @access  Public
exports.getRoadmap = async (req, res, next) => {
  try {
    const { domain, level } = req.params;

    const roadmap = await Roadmap.findOne({
      domain,
      level,
    });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        error: 'Roadmap not found',
      });
    }

    res.status(200).json({
      success: true,
      data: roadmap,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new roadmap
// @route   POST /api/roadmaps
// @access  Private (Admin)
exports.createRoadmap = async (req, res, next) => {
  try {
    const roadmap = await Roadmap.create(req.body);

    res.status(201).json({
      success: true,
      data: roadmap,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update roadmap
// @route   PUT /api/roadmaps/:id
// @access  Private (Admin)
exports.updateRoadmap = async (req, res, next) => {
  try {
    const roadmap = await Roadmap.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        error: 'Roadmap not found',
      });
    }

    res.status(200).json({
      success: true,
      data: roadmap,
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete roadmap
// @route   DELETE /api/roadmaps/:id
// @access  Private (Admin)
exports.deleteRoadmap = async (req, res, next) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        error: 'Roadmap not found',
      });
    }

    await roadmap.remove();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (err) {
    next(err);
  }
};