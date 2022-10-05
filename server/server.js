const path = require("path");
const http = require("http");  // we need it pass server to express
const express = require("express");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Set static folder
app.use(express.static(path.join(__dirname, "/../public")));

// Run when client connects
io.on('connection', socket=>{
    
    socket.emit('message', 'Welcome to Chat App!');     // message to user
    socket.broadcast.emit('message', 'A User joined a chat');

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat');     // message to everybody
    });

    //Listen for chat Message
    socket.on('chatMessage', msg=>{
        io.emit('message', msg);
    })
});


server.listen( process.env.PORT || 3000, ()=>{
    console.log("Server running on Port 3000");
});