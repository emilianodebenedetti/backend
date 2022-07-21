const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const productos = [];


app.use(express.urlencoded({ extended: true }))

app.set('views','./views');
app.set('view engine','ejs');

app.get('/', (req, res) => {
    res.render('inicio', { productos });
});

app.post('/productos', (req, res) => {
    productos.push(req.body)
    console.log(productos)
    res.redirect('/')
});

// socket.io
let messages = [
    
];

app.use(express.static('public'));

io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');
    socket.emit('messages', messages); //emitir todos los mensajes a un cliente nuevo

    socket.on('new-message', function(data){
        messages.push(data); //agregamos msjs al array
        io.socket.emit('messages', messages); //emitir a todos los clientes
    });
});

const PORT = process.env.PORT || 8080;

const srv = server.listen(PORT, () => { //server.listen por socket.io, sino app.listen
    console.log(`Servidor escuchando en el puerto ${srv.address().port}`)
})
srv.on('error', error => console.log(`Error en el servidor ${error}`))