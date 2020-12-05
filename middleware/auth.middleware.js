const jwt = require('jsonwebtoken');
const asyncHandler = require('./async.middleware');
const ErrorResponse = require('../utils/errorResponse.utils');
const User = require('../models/User.model');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // else if (req.cookies.token) {
  //   token = req.cookies.token;
  // }

  // Check if token exists
  if (!token) {
    return next(
      new ErrorResponse('Not authorized to authorized this route', 401)
    );
  }

  // Decode token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (err) {
    return next(
      new ErrorResponse('Not authorized to authorized this route', 401)
    );
  }
});

// Grant access to specific roles
exports.authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
