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

            user.orders.push(itemId);
            await user.save();
            console.log(item.restaurantId)
            // console.log(user);
            io.emit("request", {address : user.address});

        });

        socket.on("accept" , (data) => {
            console.log(data)
            io.emit("accept" , "Your order has been accepted")
        })

        socket.on("reject" , (data) => {
            console.log(data)
            io.emit("reject" , "Your order has been rejected")
        })




        // socket.on("request", async (data) => {
        //     const { token, itemId } = data;
        //     try {
        //         const decodedData = jwt.verify(token, process.env.SECRET);
        //         const user = await User.findOne({ email: decodedData });
        //         user.orders.push(itemId);
        //         await user.save();
        //         console.log(user);

        //         socket.emit("join", { message: "User joined successfully", user });
        //     } catch (error) {
        //         console.error('Error processing request:', error);
        //     }
        // });

        // socket.on("itemId", async (itemId) => {
        //     try {
        //         const item = await menuModel.findOne({ _id: itemId });
        //         if (item) {
        //             const restaurantId = item.restaurantId;
        //             const restaurant = await restaurantModel.findOne({ _id: restaurantId });
        //             if (restaurant) {
        //                 console.log(restaurant);
        //                 socket.emit("request", "hii");
        //             } else {
        //                 console.log('Restaurant not found');
        //             }
        //         } else {
        //             console.log('Item not found');
        //         }
        //     } catch (error) {
        //         console.error('Error fetching item or restaurant:', error);
        //     }
        // });

        // socket.on('update-location-captain', async (data) => {
        //     const { userId, location } = data;

        //     if (!location || !location.ltd || !location.lng) {
        //         return socket.emit('error', { message: 'Invalid location data' });
        //     }

        //     await captainModel.findByIdAndUpdate(userId, {
        //         location: {
        //             ltd: location.ltd,
        //             lng: location.lng
        //         }
        //     });
        // });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

// const sendMessageToSocketId = (socketId, messageObject) => {

//     console.log(messageObject);

//     if (io) {
//         io.to(socketId).emit(messageObject.event, messageObject.data);
//     } else {
//         console.log('Socket.io not initialized.');
//     }
// }

module.exports = { initializeSocket };