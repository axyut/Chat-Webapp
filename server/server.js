const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const publicPath = path.join(__dirname, "/../public");
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket)=>{
    console.log("New User Connected!");
        
    socket.on('disconnect', () => {
            console.log("A user just disconnected!");
    });
});


server.listen( process.env.PORT || 3000, ()=>{
    console.log("Server running on Port 3000");
});