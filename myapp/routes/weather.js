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
    let object = new climaModel(response);
    await object.save();
    res.send("Objeto guardado");
  } catch (error) {
    // throw new Error(error);
    console.error("Error " + error.message);
  }
});

router.get("/hourly", async function (req, res) {
  let hourly = req.query;
  // climaModel = new climaModel();
  try {
    if (hourly) {
      let splitHour = hourly.split(":")
      let hourlyUnix = (parseInt(splitHour[0]) * 3600) + (parseInt(splitHour[1]) * 60) 
      console.log(hourlyUnix);
      res.send('Buscando...')
      // let objetcDB = search.find({ hourly });
      // if (objectDB) {
      // }
    }
  } catch (error) {
    console.error('Error... ', error)
  }
});

module.exports = router;
