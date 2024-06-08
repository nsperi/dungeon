function isUserPhoto ( request, _response, next) {

    try {

        if(request.file) {
            request.body.photo = '/uploadedImages/' + request.file.filename
        } 
        
        return next()

    } catch (error) {
        return next(error)
    }

}

export default isUserPhoto