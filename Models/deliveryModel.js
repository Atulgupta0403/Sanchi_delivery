const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        phone: {
            type: String, required: true
        },
        currentOrder: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        },
        location: {
            latitude: { type: Number },
            longitude: { type: Number },
        },
        status: {
            type: String,
            enum: ["Available", "On Delivery"],
            default: "Available",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Delivery", deliverySchema);
