const express = require('express')
/* const server = require('http').Server(app) */
/* const io = require('socket.io')(server) */
const { Server: HttpServer } = require('http')     
const { Server: IOServer } = require('socket.io')  
/* const handlebars = require("express-handlebars"); */   //cargamos modulo handlebars

//socket.io
const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

//establecemos config de handlebars
/* app.engine(
    "hbs",
    handlebars({
        extname: ".hbs",                            
        defaultLayout: 'index.hbs',
        layout: __dirname + "/views/layouts",
        partialsDir: __dirname + '/views/partials'
    })
); */
//establecemos motor d eplantilla a utilizar
/* app.set("view engine", "hbs"); */
//establecemos directorio donde se encuentran los archivos de plantilla
app.set("views", "./views");
//espacio publico del servidor
app.use(express.static('public'))
app.use(express.static('./public')) //archivos estaticos q se encuentran aca
app.use(express.urlencoded({ extended: true }))
app.set('views','./views');
app.set('view engine','ejs');

/* app.get('/', (req, res) => {
    res.render('inicio', { productos });
});  */
app.get('/', (req, res) => {
    res.sendFile('index.html', {root:__dirname});
    
});

const productos = [];

app.post('/productos', (req, res) => {
    productos.push(req.body)
    console.log(productos)
    res.redirect('/')
});
// socket.io
let messages = [];
//Cada vez q se abra la app ...
io.on('connection', socket => { //io.on('connection', function(socket) {...}                             --- (websockets)
    console.log('Un cliente se ha conectado');

    socket.emit('messages', messages); //emitir todos los mensajes a un cliente nuevo

    socket.on('message', data => { //, function(data)
        messages.push({ socketid: socket.id, message: data }) //messages.push(data);
        io.sockets.emit('messages', messages); //emitir a todos los clientes
    })
});

const PORT = process.env.PORT || 8080;

const srv = httpServer.listen(PORT, () => { 
    console.log(`Servidor escuchando en el puerto ${srv.address().port}`)
})
srv.on('error', error => console.log(`Error en el servidor ${error}`))
/* io.on('connection', (socket) => {
    console.log('Usuario conectado')
}) */