var mongoose = require('mongoose')
var TeacherSchema = require('../schemas/teacher')
var Teacher = mongoose.model('Teacher',TeacherSchema)

module.exports = Teacher