import { Router } from 'express'

const cartsRouter = Router()

cartsRouter.get('/:id', async (_request, response, next) => {

    try {
        return response.render('carts')        
    } catch (error) {
        next(error)
    }

})

export default cartsRouter