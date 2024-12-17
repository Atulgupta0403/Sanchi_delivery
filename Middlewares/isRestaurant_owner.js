const jwt = require("jsonwebtoken")
const {User} = require("../Models/userModel")


const restaurantOwner = async (req,res,next) => {
    const token = req.cookies?.token;
    // console.log(token)
    if(token){
        const data = jwt.verify(token , process.env.SECRET)
        const owner = await User.findOne({ email : data})
        if(owner.accountType === "restaurant_owner"){
            req.owner = owner; 
            next();
        }
        else{
            next()
        }
    }
    else{
        next();
    }
}

module.exports = restaurantOwner;