const mongoose = require('mongoose')

const climaSchema = new mongoose.Schema({
    lat: Number,
    lon: Number,
    weather: String,
});


module.exports = mongoose.model('climas', climaSchema)
