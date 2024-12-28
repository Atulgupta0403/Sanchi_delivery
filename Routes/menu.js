const express = require("express");
const isLoggedIn = require("../Middlewares/isLoggedIn");
const { getMenu, addMenu, getItem } = require("../Controllers/menuController");
const restaurantOwner = require("../Middlewares/isRestaurant_owner");
const router = express.Router();

router.post("/menu" , restaurantOwner , addMenu)

router.get("/menu" , isLoggedIn , getMenu)

router.get("/item/:id" , isLoggedIn , getItem)

module.exports = router;