var mongoose = require('mongoose')
var CheckinSchema = require('../schemas/checkin')
var Checkin = mongoose.model('Checkin',CheckinSchema)

module.exports = Checkin