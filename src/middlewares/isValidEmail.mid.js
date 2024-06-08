import userManager from "../data/mongo/managers/usersManager.mongo.js";

async function isValidEmail(request, _response, next) {
  try {
    const { email } = request.body;
    const registeredEmail = await userManager.readByEmail(email);

    if (registeredEmail) {
      const error = new Error("Bad auth on register!");
      error.statusCode = 401;
      throw error;
    }

    return next();
  } catch (error) {
    return next(error);
  }
}

export default isValidEmail;
