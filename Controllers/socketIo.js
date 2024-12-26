const socketIo = require("socket.io");

const dataSending = (server) => {
    const io = socketIo(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on("connection", (socket) => {
        console.log("connected", socket.id);

        socket.emit("message", "data");
    });

    return io;
};


module.exports = dataSending;
