const path = require("path");
const http = require("http");  // we need it pass server to express
const express = require("express");
const socketIO = require("socket.io");
const formatMessage = require("./utils/messages");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Set static folder
app.use(express.static(path.join(__dirname, "/public")));

// Run when client connects
io.on('connection', socket=>{
    socket.on('joinRoom', ({username,room})=>{
        socket.emit('message', formatMessage('Chatbot','Welcome to Chat App!'));     // message to user
        socket.broadcast.emit('message', formatMessage('Chatbot','A User joined a chat'));

    })


    
    socket.on('disconnect', () => {
        io.emit('message',formatMessage('Chatbot', 'A user has left the chat'));     // message to everybody
    });

    //Listen for chat Message
    socket.on('chatMessage', msg=>{
        io.emit('message',formatMessage('USER', msg));
    })
});


server.listen( process.env.PORT || 3000, ()=>{
    console.log("Server running on Port 3000");
});