const express = require('express');
const router = express.Router();

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  uploadBootcampPhoto,
} = require('../controllers/bootcamps.controllers');

const Bootcamp = require('../models/Bootcamp.model');
const advancedResults = require('../middleware/advancedResults.middleware');

const { protect, authorize } = require('../middleware/auth.middleware');

// Include other resource routers
const courseRouter = require('./courses.routes');

// Re-route to other resource routers
router.use('/:bootcampId/courses', courseRouter);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

router
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), uploadBootcampPhoto);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

module.exports = router;
