const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    restaurantId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Restaurant", 
        required: true 
    },
    itemName: {
        type: String, 
        required: true 
    },
    description: { 
        type: String 
    },
    price: { 
        type: Number, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Menu", menuSchema);
