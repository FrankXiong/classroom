var mongoose = require('mongoose')
var LessonSchema = require('../schemas/lesson')
var Lesson = mongoose.model('Lesson',LessonSchema)

module.exports = Lesson