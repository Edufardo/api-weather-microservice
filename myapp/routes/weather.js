var express = require("express");
var router = express.Router();
const axios = require("axios");
require("dotenv").config();

const climaModel = require("../models/climaModel");

const API_key = process.env.API_key;
const exclued = "current,minutely,alerts";

router.get("/", async function (req, res) {
  let { lat, lon } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${exclued}&appid=${API_key}`;
  try {
    let data = await axios.get(url);
    let response = data.data;
    let object = new climaModel(response)
    await object.save();
    res.send('Objeto guardado')
  } catch (error) {
    // throw new Error(error);
    console.error("Error " + error.message);
  }
});

module.exports = router;
