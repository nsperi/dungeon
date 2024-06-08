async function isValidData(request, _response, next) {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      const error = new Error("¡Email and password fields are required!");
      error.statusCode = 400;
      throw error;
    }

    return next();
  } catch (error) {
    return next(error);
  }
}

export default isValidData;
