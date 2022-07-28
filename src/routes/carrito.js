const { Router } = express
const Container = require('../contenedores/Container')
const carrito = new Container('carrito.json')
const prods = new Container('productos.json')

//Router de carrito

const carritoRouter = new Router()

carritoRouter.get('/', async (req, res) => {
    res.json((await carrito.listarTodo()).map(c => c.id))
})

carritoRouter.post('/', async (req, res) => {
    res.json({ id: await carrito.guardar({ productos: [] }) })
})

carritoRouter.delete('/:id', async (req, res) => {
    res.json(await carritoInF.borrar(req.params.id))
})

carritoRouter.get('/:id/productos', async (req, res) => {
    const carritoInF = await carrito.listar(req.params.id)
    res.json(carritoInF.productos)
})

carritoRouter.post('/:id/productos', async (req, res) => { 
    const carritoInF = await carrito.listar(req.params.id)
    const producto = await prods.listar(req.body.id)
    carritoInF.productos.push(producto)
    await carrito.actualizar(carritoInF, req.params.id)
    res.end()
})

carritoRouter.delete('/:id/productos/:idProd', async (req, res) => {
    const carritoInF = await carrito.listar(req.params.id)
    const index = carritoInF.productos.findIndex(p => p.id == req.params.idProd)
    if (index != -1) {
        carritoInF.productos.splice(index, 1)
        await carritoInF.actualizar(carritoInF, req.params.id)
    }
    res.end()
})

module.exports = { carritoRouter }