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

// Include other resource routers
const courseRouter = require('./courses.routes');

// Re-route to other resource routers
router.use('/:bootcampId/courses', courseRouter);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

router.route('/:id/photo').put(uploadBootcampPhoto);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

module.exports = router;
