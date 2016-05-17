var mongoose = require('mongoose')
var ClassListSchema = require('../schemas/classList')
var ClassList = mongoose.model('Class',ClassListSchema)

module.exports = ClassList