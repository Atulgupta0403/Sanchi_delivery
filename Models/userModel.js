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
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "order"
    }],
    accountType: {
        type: String,
        enum: ["User", "admin", "Restaurant-owner", "Delivery-Partner"],
        // default : "User"
    },
    resetToken : {
        type : String
    },
    resetTokenExpires : {
        type : Date
    },
    bookmark : [{
        type : String,
        default: null
    }],
    like : [{
        type: String
    }],
    profileImage : {
        type : String,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqafzhnwwYzuOTjTlaYMeQ7hxQLy_Wq8dnQg&s"
    }
}, { timestamps: true })



const User = mongoose.model("User", userSchema);

module.exports = { User};