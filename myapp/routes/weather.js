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
    let now = new Date();
    let object = undefined;
    let isSaved = undefined;

    // Look for a file that was saved at least 3h ago.
    isSaved = await this.climaModel.find({});
    if (!isSaved) {
      let data = await axios.get(url);
      let response = data.data;
      object = new climaModel(response);
      object.savedAt = new Date();
      await object.save();
    } else {
      // Finde the saved value
      object = await climaModel.find({
        lat: lat,
        lon: lon,
      });
    }
    res.send(`Hourly: ${object.hourly}, daily: ${object.daily}`);
  } catch (error) {
    console.error("Error " + error.message);
  }
});

router.get("/hourly", async function (req, res) {
  let hourly = req.query;
  // climaModel = new climaModel();
  try {
    if (hourly) {
      // let splitHour = hourly.split(":")
      // let hourlyUnix = (parseInt(splitHour[0]) * 3600) + (parseInt(splitHour[1]) * 60)
      // console.log(hourlyUnix);
      // res.send('Buscando...')
      // let objetcDB = search.find({ hourly });
      // if (objectDB) {
      // }
    }
  } catch (error) {
    console.error("Error... ", error);
  }
});

module.exports = router;
