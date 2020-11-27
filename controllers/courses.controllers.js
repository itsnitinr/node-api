const Course = require('../models/Course.model');
const Bootcamp = require('../models/Bootcamp.model');
const ErrorResponse = require('../utils/errorResponse.utils');
const asyncHandler = require('../middleware/async.middleware');

// @route   GET /api/v1/courses
// @route   GET /api/v1/bootcamp/:bootcampId/courses
// @desc    Get courses
// @access  Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: 'bootcamp',
      select: 'name description',
    });
  }

  const courses = await query;

  res.status(200).json({ success: true, count: courses.length, data: courses });
});

// @route   GET /api/v1/courses/:id
// @desc    Get a single course
// @access  Public
exports.getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: course });
});

// @route   POST /api/v1/bootcamps/:bootcampId/courses/
// @desc    Add a course
// @access  Private
exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  // Check if bootcamp exists
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  if (!bootcamp) {
    return next(
      new ErrorResponse(
        `No bootcamp with the id of ${req.params.bootcampId}`,
        404
      )
    );
  }

  const course = await Course.create(req.body);

  res.status(200).json({ success: true, data: course });
});
