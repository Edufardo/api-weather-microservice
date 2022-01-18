const mongoose = require('mongoose')

const climaSchema = new mongoose.Schema({
    lat: { type: Number},
    lon: {type: Number},
    hourly: {type: Object, required: false},
    daily: {type: Object, required: false}
});


module.exports = mongoose.model('climas', climaSchema)
