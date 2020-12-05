const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getReviews,
  getReview,
  addReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviews.controllers');

const Review = require('../models/Review.model');

const advancedResults = require('../middleware/advancedResults.middleware');
const { protect, authorize } = require('../middleware/auth.middleware');

router
  .route('/')
  .get(
    advancedResults(Review, {
      path: 'bootcamp',
      select: 'name description',
    }),
    getReviews
  )
  .post(protect, authorize('user', 'admin'), addReview);

router
  .route('/:id')
  .get(getReview)
  .put(protect, authorize('user', 'admin'), updateReview)
  .delete(protect, authorize('user', 'admin'), deleteReview);

module.exports = router;
