// @route   GET /api/v1/bootcamps
// @desc    Get all bootcamps
// @access  Public
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all bootcamps' });
};

// @route   GET /api/v1/bootcamps/:id
// @desc    Get a bootcamp
// @access  Public
exports.getBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Show bootcamp ${req.params.id}` });
};

// @route   POST /api/v1/bootcamps
// @desc    Create a new bootcamp
// @access  Private
exports.createBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create a bootcamp' });
};

// @route   PUT /api/v1/bootcamps/:id
// @desc    Update a bootcamp
// @access  Private
exports.updateBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Update bootcamp ${req.params.id}` });
};

// @route   DELETE /api/v1/bootcamps/:id
// @desc    Delete a bootcamp
// @access  Private
exports.deleteBootcamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, msg: `Delete bootcamp ${req.params.id}` });
};
