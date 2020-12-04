const express = require('express');
const router = express.Router({ mergeParams: true });

const { getReviews, getReview } = require('../controllers/reviews.controllers');

const Review = require('../models/Review.model');

const advancedResults = require('../middleware/advancedResults.middleware');
const { protect, authorize } = require('../middleware/auth.middleware');

router.route('/').get(
  advancedResults(Review, {
    path: 'bootcamp',
    select: 'name description',
  }),
  getReviews
);

router.route('/:id').get(getReview);

module.exports = router;
