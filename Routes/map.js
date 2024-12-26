const express = require("express");
const {getCoordinates, getDistanceTime, getSuggestion} = require("../Controllers/mapController");
const router = express.Router();

router.get("/map" , getCoordinates);

router.get("/getDistance" , getDistanceTime);

router.get("/getSuggestion/:input" , getSuggestion);

module.exports = router;