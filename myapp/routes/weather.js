var express = require('express')
var router = express.Router()
var axios = require('axios');
require('dotenv').config()

const climaModel = require('../models/climaModel');

const API_key = process.env.API_key 
const excludes = "current,minutely,alerts";

router.get('/', async function (req, res) {
    let { lat, lon } = req.query
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&excludes=${excludes}&appid=${API_key}`;
    let data = await axios.get(url).then(res => res.data)
    let clima = new climaModel({ lat, lon })
    try {
        clima.save(data)
        res.send('Guardado! ¡')
    } catch (error) {
        console.log(error)
    }
    res.send(hourly)
})


module.exports = router