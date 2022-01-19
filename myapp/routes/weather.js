var express = require("express");
var router = express.Router();
var axios = require("axios");
require("dotenv").config();

const climaModel = require("../models/climaModel");

const API_key = process.env.API_key;
const excludes = "current,minutely,alerts";

router.get("/", async function (req, res) {
  let { lat, lon } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&excludes=${excludes}&appid=${API_key}`;
  try {
    let data = await axios.get(url).then((response) => response.data);
    res.send(data);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = router;
