var mongoose = require('mongoose')
var AnswerSchema = require('../schemas/answer')
var Answer = mongoose.model('Answer',AnswerSchema)

module.exports = Answer