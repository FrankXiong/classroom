var mongoose = require('mongoose')
var CourseSchema = require('../schemas/course')
var Course = mongoose.model('Course',CourseSchema)

module.exports = Course