const socketIo = require('socket.io');
const { User } = require('./Models/userModel');
const jwt = require('jsonwebtoken');
const menuModel = require('./Models/menuModel');
const restaurantModel = require('./Models/restaurantModel');

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {

        // console.log(`Client connected: ${socket.id}`);

        socket.on("request", async (data) => {

            const { token, itemId } = data;
            const decodedData = jwt.verify(token, process.env.SECRET);
            const user = await User.findOne({ email: decodedData })
            const item = await menuModel.findOne({ _id : itemId})
            const restaurantId = item.restaurantId;
            console.log(item)

            user.orders.push(itemId);
            await user.save();
            // console.log(item.restaurantId)
            // console.log(user);
            io.emit("request", {address : user.address , item : item});

        });

        socket.on("accept" , (data) => {
            console.log(data)
            io.emit("accept" , "Your order has been accepted")
        })

        socket.on("reject" , (data) => {
            console.log(data)
            io.emit("reject" , "Your order has been rejected")
        })

        socket.on("riderAccept" , (data) => {
            console.log("Rider   ")
            console.log(data)
        })

        socket.on("riderReject" , (data) => {

            console.log("Rider   ")
            console.log(data)
        })

        // socket.on('disconnect', () => {
        //     console.log(`Client disconnected: ${socket.id}`);
        // });
    });
}


module.exports = { initializeSocket };