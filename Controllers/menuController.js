const menuModel = require("../Models/menuModel");
const restaurantModel = require("../Models/restaurantModel");


const addMenu = async (req,res) => {
    if(req.owner){
        const {itemName , price , description , category , image } = req.body;
        const ownerId = req.owner._id;
        const restaurant = await restaurantModel.findOne({userId : ownerId});

        if(!restaurant){
            return res.status(201).json("First add Restaurant");
        }

        const item = await menuModel.create({
            itemName,
            description,
            price,
            category,
            restaurantId : restaurant._id,
            image
        })

        restaurant.menu.push(item._id);
        await restaurant.save();

        return res.status(200).json({message : "Menu Added Successully"})
        // res.json({message : item})
    }
    else{
        return res.status(201).json({message : "Unauthorized"})
    }
}


const getMenu = async (req,res) => {
    if(req.user){
        const {ids} = req.query;
        // console.log(req.query)
        // console.log(ids)
        
        const idArray = Array.isArray(ids) ? ids : [ids];
        const items = await menuModel.find({ _id: { $in: idArray } });
        // console.log(items);
        res.json({message : items})
    }
    else{
        res.json({message : "Unauthorized"})
    }
}

const getItem = async (req, res) => {
    if (req.user) {
        try {
            const id = req.params.id;
            // console.log("id         " , id)
            const item = await menuModel.findOne({ _id: id });
            return res.status(200).json({ message: item });
        } catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    } else {
        return res.status(401).json({ error: "Unauthorized access" });
    }
};

module.exports = {addMenu , getMenu , getItem}