var mongoose = require('mongoose')
var PaperSchema = require('../schemas/paper')
var Paper = mongoose.model('Paper',PaperSchema)

module.exports = Paper