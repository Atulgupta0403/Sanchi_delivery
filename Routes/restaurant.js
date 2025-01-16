const express = require("express");
const {addRestaurant, getRestaurant, profile} = require("../Controllers/restaurantController");
const restaurantOwner = require("../Middlewares/isRestaurant_owner");
const addMenu = require("../Controllers/menuController");
const router = express.Router()
const isLoggedIn = require("../Middlewares/isLoggedIn")
const isOwner = require("../Middlewares/isRestaurant_owner")

router.post("/restaurant" , restaurantOwner , addRestaurant);

router.get("/restaurant" , isLoggedIn , getRestaurant);

router.get("/restaurantProfile" , isOwner , profile)

module.exports = router;