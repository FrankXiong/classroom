var mongoose = require('mongoose')
var ClassSchema = require('../schemas/class')
var Class = mongoose.model('Class',ClassSchema)

module.exports = Class