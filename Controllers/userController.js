const { User } = require("../Models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const menuModel = require("../Models/menuModel")

const signup = async (req, res) => {
    try {
        const { username, email, address, password, accountType } = req.body;
        // console.log(accountType)

        const earlyUser = await User.findOne({ email })
        if (earlyUser) {
            return res.status(201).json({ message: "username or email already exist" })
        }

        function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function validatePassword(password) {
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            return passwordRegex.test(password);
        }

        if (!username || !email || !password) {
            return res.status(201).json({ message: "All fields are required" })
        }

        if (!validateEmail(email)) {
            return res.status(201).json({ message: "Invalid email" });
        }

        if (!validatePassword(password)) {
            return res.status(201).json({ message: "Invalid password" });
        }

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                const user = await User.create({
                    username,
                    email,
                    password: hash,
                    address,
                    accountType
                })
                // console.log(user)
                res.status(200).json({ message: "User Register Successfully" })
            });
        });
    } catch (error) {
        console.log(error)
    }
}


const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const result = await bcrypt.compare(password, user.password)
        if (result) {
            const token = jwt.sign(email, process.env.SECRET)
            res.cookie('token', token)
            // console.log(token)

            res.status(200).json({ message: token, accountType: user.accountType })
        }
        else {
            res.status(201).json({ message: "Wrong password" })
        }
    }
    else {
        res.status(201).json({ message: "No User with this email" })
    }
}


const bookmark = async (req, res) => {
    if (req.user) {
        const { Itemid } = req.body;
        // console.log(Itemid)
        const user = req.user;
        const index = user.bookmark.indexOf(Itemid);
        if (index > -1) {
            user.bookmark.splice(index, 1);
            await user.save();
            return res.status(200).json({ message: "Removed from bookmarks", show: "Add Bookmark" });
        } else {
            user.bookmark.push(Itemid);
            await user.save();
            return res.status(200).json({ message: "Added to bookmarks", show: "Remove Bookmark" });
        }
    }
    else {
        return res.status(201).json({ message: "Unauthorized" });
    }
}


const getBookmark = async (req, res) => {
    if (req.user) {
        const user = req.user;
        const bookmark = user.bookmark;

        const idArray = Array.isArray(bookmark) ? bookmark : [bookmark];
        const items = await menuModel.find({ _id: { $in: idArray } }).select("-description -createdAt -updatedAt");
        // console.log("Items   " , items);

        if (bookmark.length > 0) {
            // console.log("if")
            res.status(200).json({ message: items });
        }
        else {
            // console.log("else")
            res.status(201).json({ message: "No result" });
        }
    }
    else {
        return res.status(201).json({ message: "Unauthorized" });
    }
}

const getOrder = async (req, res) => {
    if (req.user) {
        const user = req.user;
        const orders = user.orders;

        const idArray = Array.isArray(orders) ? orders : [orders];
        const items = await menuModel.find({ _id: { $in: idArray } })
        console.log(items)

        // console.log(orders)
        if (orders.length > 0) {
            return res.status(200).json({ message: items });
        }
        else {
            return res.status(200).json({ message: ["No result"] });
        }
    }
    else {
        return res.send(201).json({ message: "Unauthorized" })
    }
}

const deleteUser = async (req, res) => {
    if (req.user) {
        const user = req.user;
        const deleteUser = await User.findOneAndDelete({ _id: user._id })
        res.status(200).json({ message: "User Deleted" })
    }
    else {

        res.status(201).json({ message: "Unauthorized" })
    }
}


const profile = (req, res) => {
    if (req.user) {
        const user = req.user;
        res.status(200).json({ message: user })
    }
    else {
        res.status(201).json({ message: "Unauthorized" })
    }
}


const addToCart = async (req,res) => {
    if(req.user){
        const { itemId } = req.body;
        const user = req.user;
        user.cartItems.push(itemId)
        await user.save()
        console.log(user)
        res.status(200).json({message : user.cartItems})
    }
    else{
        res.status(201).json({ message: "Unauthorized" })
    }
}

const getCart = async (req,res) => {
    if(req.user){
        const user = req.user;
        const cartItems = user.cartItems;

        const items = await Promise.all(cartItems.map(async (id) => {
            const item = await menuModel.findOne({ _id: id });
            return item;
        }));

        console.log(items);

        res.json({ message: items });
    }
    else{
        res.status(201).json({ message: "Unauthorized" })
    }
}

const like = async (req,res) => {
    if(req.user){
        const {itemId} = req.body;
        const user = req.user;
        user.like.push(itemId)
        await user.save()
        res.status(200).json({message : "liked"})
    }
    else{
        res.status(201).json({ message: "Unauthorized" })
    }
}

module.exports = { signup, login, bookmark, getBookmark, getOrder, deleteUser, profile, addToCart, getCart, like}