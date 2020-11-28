const User = require('../models/User.model');
const ErrorResponse = require('../utils/errorResponse.utils');
const asyncHandler = require('../middleware/async.middleware');

// @route   POST /api/v1/auth/register
// @desc    Register user
// @access  Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  // Create JWT token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});

// @route   POST /api/v1/auth/login
// @desc    Login an user
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400));
  }

  // Check if user exists
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Check if password matches
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  // Create JWT token
  const token = user.getSignedJwtToken();

  res.status(200).json({ success: true, token });
});
