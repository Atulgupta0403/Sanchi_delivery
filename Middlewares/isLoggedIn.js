const jwt = require("jsonwebtoken");
const { User } = require("../Models/userModel");

const isLoggedIn = async (req,res,next) => {
    const authHeader =  req.headers['authorization'];
    // console.log(authHeader)
    if(authHeader){
        const data = jwt.verify(authHeader , process.env.SECRET);
        const user = await User.findOne({ email : data});
        req.user = user;
        next();
    }
    else{
        next();
    }
}


module.exports = isLoggedIn;