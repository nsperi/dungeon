import { Router } from "express";
import productManager from "../../data/fs/ProductManager.js";

const productsRouter = Router()

productsRouter.get('/', async (_request, response, next) => {
    
    try {

        const products = await productManager.read()
        return response.render('products', { products })
        
    } catch (error) {
        return next(error)
    }

})

productsRouter.get('/real', async (_request, response, next) => {
    try {

        return response.render('productsLoad')

    } catch (error) {
        return next(error)
        
    }
})

productsRouter.get('/:id', async (request, response, next ) => {

    try {

        const { id } = request.params
        const product = await productManager.readOne(id)
        return response.render('productDetail', { product })
        
    } catch (error) {
        return next(error)
    }
})

export default productsRouter