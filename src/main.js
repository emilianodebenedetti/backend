/* const { render } = require("ejs"); */
//const socket = io(); //websockets
const socket = io.connect(); 
let idSocket = 0;
function setSocketId(id){
    idSocket = id;
}

const input = document.querySelector('input')
document.querySelector('button').addEventListener('click', () => {
    socket.emit('message', input.value);
})

socket.on('messages', data => { //, function(data)
    const mensajesHTML = data
    .map(msj => `SocketId: ${msj.socketid} -> Mensaje: ${msj.message}`)
    .join('<br>')
    console.log(data);
    render(data);
    document.querySelector('p').innerHTML = mensajesHTML
});

function render(data) {
    let html = data.map(function(elem, index){
        return(`<div>
                <strong>${elem.author}</strong>
                <em>${elem.text}</em> 
                </div>
                `)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessage() {
    let mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value,
    };
    socket.emit('new-message', mensaje); //nombre evento new-message

    document.getElementById('text').value = '' //vaciar campo de texto(no recargamos pagina)
    document.getElementById('text').focus()
    
}