import { Router } from 'express'
import cartsManager from '../../data/mongo/managers/cartsManager.js'

const cartsRouter = Router()

cartsRouter.get('/', paginate)
cartsRouter.get('/:id', paginate)
cartsRouter.post('/', create)
cartsRouter.put('/:id', update)
cartsRouter.delete('/:id', destroy)


async function paginate (request, response, next) {

    try {

        const sortAndPaginate = {}
        request.query.limit && (sortAndPaginate.limit = request.query.limit)
        request.query.page && (sortAndPaginate.page = request.query.page)
        request.query.prevPage && (sortAndPaginate.prevPage = request.query.prevPage)
        request.query.nextPage && (sortAndPaginate.nextPage = request.query.nextPage )

        const filter = {}
        request.params.id && (filter.user_id = request.params.id)

        const result = await cartsManager.paginate({filter, sortAndPaginate})
        const userCarts = result.docs.map( cart => cart.toObject())

        let page = result.page
        let prevPage = result.prevPage
        let nextPage = result.nextPage

        if (userCarts.length !== 0) {
            return response.render('carts', {userCarts, page, prevPage, nextPage})
        }

        
    } catch (error) {
        return next(error)
    }
}

async function readOne ( request, response, next ) {

    try {

        const { id } = request.params

        const foundCart = await cartsManager.readOne(id, next)

        if (foundCart) {
            return response.json({
                statusCode: 200,
                succes: true,
                response: foundCart
            })

        } else {
            const error = new Error(`Cart id ${id} not found`)
            error.statusCode = 404
            throw error
        }

    } catch (error) {
        return next(error)
    }
}

async function create (request, response, next) {

    try {

        const data = request.body
        const cart = await cartsManager.create(data, next)

        return response.json({
            statusCode: 201,
            succes: true,
            message: `Cart created with ID ${cart.id}`
        })
        
    } catch (error) {
        return next(error)
    }
}

async function update (request, response, next) {

    try {

        const data = request.body
        const { id } = request.params
        const updatedCart = await cartsManager.update(id, data, next)

        if(updatedCart) {
            return response.json({
                statusCode: 200,
                succes: true,
                response: updatedCart
            })
        }        
        
    } catch (error) {
        return next(error)
    }
}

async function destroy (request, response, next) {
    try {

        const { id } = request.params
        const foundCart = await cartsManager.readOne(id, next)

        if (!foundCart) {
            const error = new Error(`Cart id ${id} not found`)
            error.statusCode = 404
            throw error
        } else {
            const deletedCart = await cartsManager.destroy(id)
            return response.json({
                statusCode: 200,
                succes: true,
                message: `Cart ID ${id} succesfully deleted.`
            })
        }
        
    } catch (error) {
        return next(error)
    }
}

export default cartsRouter