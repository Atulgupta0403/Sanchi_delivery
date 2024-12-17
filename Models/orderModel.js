const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true
    },
    items: [{
        menuItem: {
            type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true
        },
        quantity: { 
            type: Number, 
            required: true 
        },
    }],
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Pending", "Preparing", "Out for Delivery", "Delivered", "Cancelled"],
        default: "Pending",
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    deliveryTime: {
        type: Number
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);
