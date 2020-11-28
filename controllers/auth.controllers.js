const User = require('../models/User.model');
const ErrorResponse = require('../utils/errorResponse.utils');
const asyncHandler = require('../middleware/async.middleware');

// @route   GET /api/v1/auth/register
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
