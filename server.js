const http = require("http")
const app = require("./index")

const PORT = process.env.PORT;
const server = http.createServer(app)

server.listen(PORT , () => {
    console.log(`Server is listening at port:${PORT}`);
})