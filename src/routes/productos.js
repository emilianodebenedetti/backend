const { Router } = express
const Container = require('../contenedores/Container')
const prods = new Container('productos.json')
const { esAdmin } = require('../middlewares/index')


const prodsRouter = new Router()

prodsRouter.get('/', async (req, res) => {
    const prodsr = await prods.listarTodo()
    res.json(prodsr)
})

prodsRouter.get('/:id', async (req, res) => {
    res.json(await prods.listar(req.params.id))
})

prodsRouter.post('/', esAdmin, async (req, res) => {
    res.json({ id: await prods.guardar(req.body) })
})
prodsRouter.put('/:id', esAdmin, async (req, res) => {
    res.json(await prods.actualizar(req.body, req.params.id))
})
prodsRouter.delete('/:id', esAdmin, async (req, res) => {
    res.jason(await prods.borrar(req.params.id))
})

module.exports = { prodsRouter }