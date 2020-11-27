const express = require('express');
const router = express.Router({ mergeParams: true });

const { getCourses } = require('../controllers/courses.controllers');

router.route('/').get(getCourses);

module.exports = router;
