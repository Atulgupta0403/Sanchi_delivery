const restaurantModel = require("../Models/restaurantModel");

const addRestaurant = async (req, res) => {
    if (req.owner) {
        // console.log(req.owner)

        const { restaurantName, location, cuisine , image} = req.body;

        if (!restaurantName || !location || !cuisine || !image) {
            return res.status(201).json({ message: "All fields are required" })
        }

        const restaurant = await restaurantModel.create({
            restaurantName,
            location,
            cuisine,
            userId: req.owner._id,
            image
        })

        // console.log(restaurant);
        return res.status(200).json({ message: "Restaurant Added Successfully" })
    }
    else {
        return res.status(201).json({ message: "UnAuthorized" });
    }
}

const getRestaurant = async (req, res) => {
    if (req.user) {
        const restaurant = await restaurantModel.find();
        // console.log(req.user);
        res.json({ message: restaurant })
    }
    else {
        res.json({ message: "UnAuthorized" });
    }
}

const profile = async (req,res) => {
    if(req.owner){
        // console.log(req.owner)
        const restaurant = await restaurantModel.findOne({userId : req.owner._id})
        // console.log(restaurant)
        res.json({message : restaurant})
    }
    else{
        res.json({message : "UnAuthorized"})
    }
}



module.exports = { addRestaurant, getRestaurant , profile};