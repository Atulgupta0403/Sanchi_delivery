const mongoose = require("mongoose")
 
const restaurantSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        require : true
    },
    restaurantName : {
        type : String,
        require : true
    },
    location : {
        type : String,
        require : true
    },
    cuisine : {
        type: [String], 
        required: true 
    },
    menu: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Menu" 
    }],
    rating: {
        type: Number, 
        default: 0 
    },
    image: {
        type: String 
    }
})


module.exports = mongoose.model("Restaurant" , restaurantSchema);