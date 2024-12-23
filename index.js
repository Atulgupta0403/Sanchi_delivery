require('dotenv').config()
const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express()

app.use(cookieParser())
app.use(cors({
    origin: "*", 
    credentials: true, 
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.get("/" , (req,res) => {
    res.json({message : "Slash page"})
})



const login = require("./Routes/login")
const signup = require("./Routes/signup")
const restaurant = require("./Routes/restaurant")
const menu = require("./Routes/menu")
const forgetPass = require("./Routes/forgetPassword")
const map = require("./Routes/map")

app.use("/" , login);
app.use("/" , signup);
app.use("/" , restaurant);
app.use("/" , menu);
app.use("/" , forgetPass);
app.use("/" , map);

app.listen(process.env.PORT || 3000 , () => {
    console.log(`app is listening on port ${process.env.PORT}`);
})