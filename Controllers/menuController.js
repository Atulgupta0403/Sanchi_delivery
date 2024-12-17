const menuModel = require("../Models/menuModel");
const restaurantModel = require("../Models/restaurantModel");


const addMenu = async (req,res) => {
    if(req.owner){

        const {itemName , price , description , category } = req.body;
        const ownerId = req.owner._id;
        const restaurant = await restaurantModel.findOne({userId : ownerId});

        const item = await menuModel.create({
            itemName,
            description,
            price,
            category,
            restaurantId : restaurant._id
        })

        restaurant.menu.push(item._id);
        await restaurant.save();

        res.json({message : item})
    }
    else{
        res.json({message : "Unauthorized"})
    }
}


const getMenu = async (req,res) => {
    const {ids} = req.query;
    console.log(req.query)
    console.log(ids)

    const idArray = Array.isArray(ids) ? ids : [ids];
    const items = await menuModel.find({ _id: { $in: idArray } });
    console.log(items);
    res.json({message : items})
}


module.exports = {addMenu , getMenu}