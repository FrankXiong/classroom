var mongoose = require('mongoose')
var SessionSchema = require('../schemas/session')
var Session = mongoose.model('Session',SessionSchema)

module.exports = Session