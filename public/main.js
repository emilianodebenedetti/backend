const { render } = require("ejs");

let socket = io.connect();
socket.on('messages', function(data) {
    console.log(data);
    render(data);
});

function render(data) {
    let html = data.map(function(elem, index){
        return(`<div>
                <strong>${elem.author}</strong>
                <em>${elem.text}</em> </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

function addMessage() {
    let mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value,
    };
    socket.emit('new-message', mensaje); //nombre evento new-message

    document.getElementById('texto').value = '' //vaciar campo de texto(no recargamos pagina)
    document.getElementById('texto').focus()
    
}