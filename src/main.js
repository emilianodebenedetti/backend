const app = require ('./server')

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor conectado escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))