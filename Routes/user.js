const express = require("express");
const isLoggedIn = require("../Middlewares/isLoggedIn");
const { bookmark, getBookmark } = require("../Controllers/userController");
const router = express.Router();

router.post("/bookmark" , isLoggedIn , bookmark);

router.get("/bookmark" , isLoggedIn , getBookmark);

module.exports = router;