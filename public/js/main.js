
const chatForm = document.getElementById('chat-form');
const socket = io();
const chatMessages = document.querySelector('.chat-messages');

// Get username nad room from url
const {username, room} = Qs.parse(location.search, {ignoreQueryPrefix:true});
socket.emit('joinRoom', {username, room});

socket.on('message', message=>{   // catching message emiting from server side
    console.log(message);
    outputMessage(message);

    //Scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Message Submit
chatForm.addEventListener('submit', (e)=>{
    e.preventDefault();  // prevent automatic submision  to file
    
    //Get message text
    const msg = e.target.elements.msg.value;
    
    // Emit message to server
    socket.emit('chatMessage', msg);

    //Clear input
    e.target.elements.msg.value = '';
    e.target.elements.msg.focus();
});

// Output message to DOM
function outputMessage(message){
    const div = document.createElement('div');
    div.innerHTML = `<div class="message"><p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">${message.text}</p></div>`;

    document.querySelector('.chat-messages').appendChild(div);
}
