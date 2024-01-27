const path = require("path");
const http = require("http");  // we need it pass server to express
const express = require("express");
const socketIO = require("socket.io");
const formatMessage = require("./utils/messages");
const {userJoin, getCurrentUser, userLeave, getRoomUser} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Set static folder
app.use(express.static(path.join(__dirname, "/public")));

// Run when client connects
io.on('connection', socket=>{
    socket.on('joinRoom', ({username,room})=>{

        const user = userJoin(socket.id, username, room);
        socket.join(user.room);

        socket.emit('message', formatMessage('Chatbot','Welcome to Chat App!'));     // message to user
        socket.broadcast.to(user.room).emit('message', formatMessage('Chatbot',`${user.username} joined the chat`));

        // Send users and room information
        io.to(user.room).emit('roomUsers', {room: user.room, users: getRoomUser(user.room)});
    })


    //Listen for chat Message
    socket.on('chatMessage', msg=>{
        const user = getCurrentUser(socket.id);
        io.to(user.room).emit('message',formatMessage(user.username, msg));
    });


    socket.on('disconnect', () => {
        const user = userLeave(socket.id);

        if (user) {
            io.to(user.room).emit('message',formatMessage('Chatbot', `${user.username} has left the chat.`));     // message to everybody    
        }
        // Send users and room information
        io.to(user.room).emit('roomUsers', {room: user.room, users: getRoomUser(user.room)});
    
    });
});


server.listen( process.env.PORT || 3000, ()=>{
    console.log("Server running on Port 3000");
});