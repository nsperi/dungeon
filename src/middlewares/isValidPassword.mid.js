import userManager from "../data/mongo/managers/usersManager.mongo.js";
import { verifyHash } from "../utils/hash.util.js";

async function isValidPassword(request, response, next) {
  try {
    const { email, password } = request.body;
    const registeredUser = await userManager.readByEmail(email);
    const verify = verifyHash(password, registeredUser.password);
    if (verify) {
      return next();
    }

    if (registeredUser.password !== password) {
      const error = new Error("¡Invalid credentials!");
      error.statusCode = 401;
      throw error;
    }

    return next();
  } catch (error) {
    return next(error);
  }
}

export default isValidPassword;
