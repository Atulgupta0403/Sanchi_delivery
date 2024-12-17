const express = require("express");
const isLoggedIn = require("../Middlewares/isLoggedIn");
const { getMenu, addMenu } = require("../Controllers/menuController");
const restaurantOwner = require("../Middlewares/isRestaurant_owner");
const router = express.Router();

router.post("/menu" , restaurantOwner , addMenu)

router.get("/menu" , isLoggedIn , getMenu)

module.exports = router;