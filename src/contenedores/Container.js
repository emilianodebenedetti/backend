const { promises: fs } = require('fs')

class Container {
    constructor(ruta) {
        this.ruta = ruta;
    }

    async listar(id) {
        const objs = await this.listarTodo()
        const buscar = objs.find(o => o.id = id)
        return buscar
    }

    async listarTodo() {
        try {
            const objs = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(objs)
        } catch (error) {
            return []
        }
    }

    async guardar(obj) {
        const objs = await this.listarTodo()

        let newId
        if (objs.length == 0) {
            newId = 1
        } else {
            newId = objs[objs.length - 1].id + 1
        }

        const newObj = { ...obj, id:newId }
        objs.push(newObj)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async actualizar(elem, id) {
        const objs = await this.listarTodo()
        const index = objs.findIndex(o => o.id == id)
        if (index == -1) {
            throw new Error(`Error al actualizar: no se encontrò el id ${id}`)
        } else { 
            objs[index] = { ...elem, id }
            try {
                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
            } catch (error) {
                throw new Error(`Error al borrar: ${error}`)
            }
        }
    }

    async borrar(id) {
        const objs = await this.listarTodo()
        const index = objs.findIndex(o => o.id == id)
        if ( index == -1) {
            throw new Error(`Error al borrar: no se encontro el id ${id}`)
        }
        objs.splice(index, 1)
        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
        } catch (error) {
            throw new Error (` Error al borrar: ${error}`)
        }
    }
    async borrarTodo() {
        try {
            await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error(`Error al borrar todo: ${error}`)
        }
    }
}
module.exports = Container