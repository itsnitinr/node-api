const express = require('express');
const router = express.Router({ mergeParams: true });

const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
} = require('../controllers/courses.controllers');

router.route('/').get(getCourses).post(addCourse);
router.route('/:id').get(getCourse).put(updateCourse);

module.exports = router;
