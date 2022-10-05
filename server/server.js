const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "/../public");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));


server.listen(3000 || process.env.PORT, ()=>{
    console.log("Server running on Port 3000");
});