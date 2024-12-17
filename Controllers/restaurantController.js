const restaurantModel = require("../Models/restaurantModel");

const addRestaurant = async (req, res) => {
    if (req.owner) {

        const { restaurantName, location, cuisine } = req.body;

        if (!restaurantName || !location || !cuisine) {
            res.json({ message: "All fields are required" })
        }

        const restaurant = await restaurantModel.create({
            restaurantName,
            location,
            cuisine,
            userId: req.owner._id
        })

        console.log(restaurant);
        res.json({ message: restaurant })
    }
    else {
        res.json({ message: "UnAuthorized" });
    }
}

const getRestaurant = async (req, res) => {
    if (req.user) {
        const restaurant = await restaurantModel.find();
        res.json({ message: restaurant })
    }
    else {
        res.json({ message: "UnAuthorized" });
    }
}



module.exports = { addRestaurant, getRestaurant };