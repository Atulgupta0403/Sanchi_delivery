const { User } = require("../Models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")

const signup = async (req, res) => {
    try {
        const { username, email, address, password } = req.body;

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
                    address
                })
                res.status(200).json({ message: "User Register Successfully" })
            });
        });
    } catch (error) {
        console.log(error)
    }
}


const login = async (req,res) => {
    const {email , password} = req.body;
    const user = await User.findOne({ email });
    if(user){
        const result = await bcrypt.compare(password , user.password)
        if(result){
            const token = jwt.sign(email , process.env.SECRET)
            await res.cookie('token' , token , {maxAge: 900000})
            console.log(token)
            // console.log(req.cookies.token)

            res.status(200).json({message : token})
        }
        else{   
            res.status(201).json({message : "Wrong password"})
        }        
    }
    else{
        res.status(201).json({ message : "No User with this email" })
    }
}


module.exports = { signup , login }