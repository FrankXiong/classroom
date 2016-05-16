var mongoose = require('mongoose')
var QuestionSchema = require('../schemas/question')
var Question = mongoose.model('Question',QuestionSchema)

module.exports = Question