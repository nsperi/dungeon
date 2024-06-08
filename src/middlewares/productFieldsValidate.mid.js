function productFieldsValidate (request, _response, next) {
    try {

        console.log(request.body);
        const { title, category, photo, price, stock } = request.body

        if(Object.keys(request.body).length ===0) {
            const error = new Error('Bad request: the create method requires a data object that has not been passed as a parameter.')
            error.statusCode = 400
            throw error
        }

        if(!title) {
            const error = new Error('Bad request: title field is required.')
            error.statusCode = 400
            throw error
        }

        !category && (request.body.category = 'Hardware')        

        !photo && (request.body.photo = '/images/no_photo.svg')
        
        !stock && (request.body.stock = 1)

        !price && (request.body.price = 1)

        return next()
        
    } catch (error) {
        return next(error)        
    }
}

export default productFieldsValidate