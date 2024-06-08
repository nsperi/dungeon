async function isAdmin(request, _response, next) {
  try {
    const { role } = request.session;

    if (role !== "admin") {
      const error = new Error("¡Forbidden!");
      error.statusCode = 403;
      throw error;
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

export default isAdmin;
