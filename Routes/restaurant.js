const express = require("express");
const {addRestaurant, getRestaurant} = require("../Controllers/restaurantController");
const restaurantOwner = require("../Middlewares/isRestaurant_owner");
const addMenu = require("../Controllers/menuController");
const router = express.Router()
const isLoggedIn = require("../Middlewares/isLoggedIn")

router.post("/restaurant" , restaurantOwner , addRestaurant);

router.get("/restaurant" , isLoggedIn , getRestaurant);

module.exports = router;