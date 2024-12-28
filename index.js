require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(cookieParser());
app.use(cors({
    origin: "*",
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
    res.json({ message: "Slash page foody" });
});

const login = require("./Routes/login");
const signup = require("./Routes/signup");
const restaurant = require("./Routes/restaurant");
const menu = require("./Routes/menu");
const forgetPass = require("./Routes/forgetPassword");
const map = require("./Routes/map");
const bookmark = require("./Routes/user");

app.use("/", login);
app.use("/", signup);
app.use("/", restaurant);
app.use("/", menu);
app.use("/", forgetPass);
app.use("/", map);
app.use("/" , bookmark)

module.exports = app