const express = require("express");
const isLoggedIn = require("../Middlewares/isLoggedIn");
const { bookmark, getBookmark, getOrder, deleteUser } = require("../Controllers/userController");
const router = express.Router();

router.post("/bookmark" , isLoggedIn , bookmark);

router.get("/bookmark" , isLoggedIn , getBookmark);

router.get("/orders" , isLoggedIn , getOrder)

router.delete("/delete" , isLoggedIn , deleteUser)
 
module.exports = router;