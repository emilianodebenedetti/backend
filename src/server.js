const express = require('express')
const { prodsRouter, carritoRouter } = require('./routes')

//server
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api/productos', prodsRouter)
app.use('/api/carrito', carritoRouter)

module.exports = { app }

