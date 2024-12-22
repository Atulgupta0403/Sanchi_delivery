const { User } = require("../Models/userModel");
const { v4: uuidv4 } = require('uuid');
const transporter = require("../Utils/forgetPassword")
const bcrypt = require("bcrypt")


const forgetPassHandler = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const resetToken = uuidv4();
        user.resetToken = resetToken;
        user.resetTokenExpires = Date.now() + 3600000;
        await user.save();

        const resetUrl = `http://localhost:3000/password/reset/${resetToken}`

        const mailOptions = {
            from: "atulgupta0403@gmail.com",
            to: email,
            subject: "password reset request",
            text: `You requested a password reset. Click the link to reset your password: ${resetUrl}`,
            html: `<p>You requested a password reset. http://localhost:3000/password/reset/${resetToken}`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).send(`Error sending email ${error}`);
            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json({message : 'Password reset email sent'});
            }
        })
    }
    else {
        res.json({ message: `No user with email = ${email}` })
    }
}



const resetPassHandler = async (req,res) => {
    const { resetToken } = req.params;
    const { new_password } = req.body;

    function validatePassword(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(new_password);
    }

    if (!validatePassword) {
        res.json({ message: "Enter some Strong password" })
    }

    const user = await User.findOne({
        resetToken: resetToken,
        resetTokenExpires: { $gt: Date.now() }
    })

    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(new_password, salt, async function (err, hash) {
            user.password = hash;
            user.resetToken = null,
                user.resetTokenExpires = null,
                await user.save();
        })
    })

    res.json({ message: "password changed" })



}


module.exports = { forgetPassHandler, resetPassHandler };