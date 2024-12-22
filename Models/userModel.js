const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URL);


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require : true
    },
    address: {
        type: String,
        require : true
    },
    email: {
        type: String,
        unique : true
    },
    password: {
        type: String,
        require : true
    },
    orders: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order"
    },
    accountType: {
        type: String,
        enum: ["customer", "admin", "restaurant_owner", "delivery_person"],
        default : "customer"
    },
    resetToken : {
        type : String
    },
    resetTokenExpires : {
        type : Date
    }
}, { timestamps: true })


// const customerSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     },
//     orderHistory : [{
//         type : mongoose.Schema.Types.ObjectId,
//         ref : "Order"
//     }]
// })

// const restaurantSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     },
//     restaurantId : [{
//         type : mongoose.Schema.Types.ObjectId,
//         ref : "Restaurant"
//     }]
// })

// const deliveryPersonSchema = new mongoose.Schema({
//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     },
// })

const User = mongoose.model("User", userSchema);
// const customer = mongoose.model("Customer", customerSchema);
// const restaurantOwner = mongoose.model("RestaurantOwner", restaurantSchema);
// const deliveryPerson = mongoose.model("DeliveryPerson", deliveryPersonSchema);

module.exports = { User};