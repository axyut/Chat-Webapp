
const chatForm = document.getElementById('chat-form');
const socket = io();
const chatMessages = document.querySelector('.chat-messages');

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
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">${message}</p>`;

    document.querySelector('.chat-messages').appendChild(div);
}
