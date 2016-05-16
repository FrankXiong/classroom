var mongoose = require('mongoose')
var StupaperSchema = require('../schemas/stupaper')
var Stupaper = mongoose.model('Stupaper',StupaperSchema)

module.exports = Stupaper