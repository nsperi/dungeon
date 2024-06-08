async function isAnEmail(request, _response, next) {
  try {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    const { email } = request.body;
    const emailFormat = emailRegex.test(email);

    if (!emailFormat) {
      const error = new Error(
        "¡It looks like something is wrong with the email format!"
      )
      error.statusCode = 400;
      throw error;
    }

    return next();
  } catch (error) {
    return next(error);
  }
}

export default isAnEmail;
