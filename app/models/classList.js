var mongoose = require('mongoose')
var ClassListSchema = require('../schemas/classList')
var ClassList = mongoose.model('ClassList',ClassListSchema)

module.exports = ClassList