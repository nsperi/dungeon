import userManager from "../data/mongo/managers/usersManager.mongo.js";

async function isValidUser(request, response, next) {
  try {
    const { email } = request.body;
    const registeredUser = await userManager.readByEmail(email);

    if (!registeredUser) {
      const error = new Error("¡Bad auth on login!");
      error.statusCode = 401;
      throw error;
    }

    return next();
  } catch (error) {
    return next(error);
  }
}

export default isValidUser;
