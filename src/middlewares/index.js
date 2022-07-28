const admin = true

function NoAdmin(ruta, metodo) {
    const error = {
        error: -1,
    }
    if (ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no disponible`
    }
    else {
        error.description = 'no disponible'
    }
    return error
}

function esAdmin(req, res, next) {
    if (!admin) {
        res.json(NoAdmin())
    } else {
        next()
    }
}

module.exports = { esAdmin }