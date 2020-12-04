const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/users.controllers');

const User = require('../models/User.model');

const advancedResults = require('../middleware/advancedResults.middleware');
const { protect, authorize } = require('../middleware/auth.middleware');

// Add protect and authorize middleware to all routes
router.use(protect);
router.use(authorize('admin'));

router.route('/').get(advancedResults(User), getUsers).post(createUser);

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
