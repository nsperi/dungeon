import { Router } from "express";
//import productManager from "../../data/fs/ProductManager.js";
import productManager from "../../data/mongo/managers/productsManager.mongo.js";
import uploader from "../../middlewares/multer.mid.js";
import isPhoto from '../../middlewares/isPhoto.mid.js'
import productFieldsValidate from '../../middlewares/productFieldsValidate.mid.js'

const productsRouter = Router()

productsRouter.get('/', paginate)
productsRouter.get('/:id', readOne)
productsRouter.post('/', uploader.single('photo'), isPhoto, productFieldsValidate, create)
productsRouter.put('/:id', update)
productsRouter.delete('/:id', destroy)

async function read( request, response, next ) {

    try {
        const { category } = request.query
        const allProducts = category ? await productManager.read(category) : await productManager.read()

        if (allProducts.length !== 0) {
            return response.json({
                statusCode: 200,
                succes: true,
                response: allProducts
            })
        } else {
            const error = new Error('No products to show.')
            error.statusCode = 404
            throw error
        }
    } catch (error) {
        return next(error)
    }
}

async function paginate (request, response, next) {
    
    try {
        const sortAndPaginate = {}
        request.query.limit && (sortAndPaginate.limit = request.query.limit)
        request.query.page && (sortAndPaginate.page = request.query.page)
        request.query.prevPage && (sortAndPaginate.prevPage = request.query.prevPage)
        request.query.nextPage && (sortAndPaginate.nextPage = request.query.nextPage )

        const filter = {}
        request.query.category && (filter.category = request.query.category)

        const result = await productManager.paginate({filter, sortAndPaginate})
        let products = result.docs.map( product => product.toObject())
        let page = result.page
        let prevPage = result.prevPage
        let nextPage = result.nextPage

        return response.render('products', {products, page, prevPage, nextPage} )
        
    } catch (error) {
        return next(error)
    }
}

async function readOne ( request, response, next ) {

    try {

        const { id } = request.params

        const foundProduct = await productManager.readOne(id, next)

        if (foundProduct) {
            return response.json({
                statusCode: 200,
                succes: true,
                response: foundProduct
            })

        } else {
            const error = new Error(`Product id ${id} not found`)
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
        const product = await productManager.create(data, next)

        return response.json({
            statusCode: 201,
            succes: true,
            message: `Product created with ID ${product.id}`
        })
        
    } catch (error) {
        return next(error)
    }
}

async function update (request, response, next) {

    try {

        const data = request.body
        const { id } = request.params
        const updatedProduct = await productManager.update(id, data, next)

        if(updatedProduct) {
            return response.json({
                statusCode: 200,
                succes: true,
                response: updatedProduct
            })
        }        
        
    } catch (error) {
        return next(error)
    }
}

async function destroy (request, response, next) {
    try {

        const { id } = request.params
        const foundProduct = await productManager.readOne(id, next)

        if (!foundProduct) {
            const error = new Error(`Product id ${id} not found`)
            error.statusCode = 404
            throw error
        } else {
            const deletedProduct = await productManager.destroy(id)
            return response.json({
                statusCode: 200,
                succes: true,
                message: `Product ID ${id} succesfully deleted.`
            })
        }
        
    } catch (error) {
        return next(error)
    }
}

export default productsRouter