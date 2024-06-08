function userFieldsValidate(request, _response, next) {
  try {
    const { name, email, password, photo, role } = request.body;

    if (Object.keys(request.body).length === 0) {
      const error = new Error(
        "Bad request: the create method requires a data object that has not been passed as a parameter."
      );
      error.statusCode = 400;
      throw error;
    }

    if (!name) {
      const error = new Error("Bad request: name field is required.");
      error.statusCode = 400;
      throw error;
    }

    if (!email) {
      const error = new Error("Bad request: email field is required.");
      error.statusCode = 400;
      throw error;
    }

    if (!password) {
      const error = new Error("Bad request: password field is required.");
      error.statusCode = 400;
      throw error;
    }

    !role && (request.body.role = "customer");

    !photo && (request.body.photo = "/images/no_profile_photo.png");

    return next();
  } catch (error) {
    return next(error);
  }
}

export default userFieldsValidate;
