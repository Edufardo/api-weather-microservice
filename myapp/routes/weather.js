var express = require('express')
var router = express.Router()
var axios = require('axios');
const climaModel = require('../models/climaModel');

const API_key = "10b3508cf0b8b1ab9e071ab69ee405f8";
const excludes = "currently,minutely,alerts";

router.get('/', async function (req, res) {
    let { lat, lon } = req.query
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&excludes=${excludes}&appid=${API_key}`;
    let data = await axios.get(url).then(res => res.data)
    res.send(data)
})


module.exports = router