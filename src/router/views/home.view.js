import { Router } from "express";
import { Types } from "mongoose";
import productManager from "../../data/mongo/managers/productsManager.mongo.js";

const homeRouter = Router();

homeRouter.get("/", async (request, response, next) => {
  const user = request.session.email;

  try {
    if (user) {
      const filter = {};
      const sortAndPaginate = { limit: 6 };

      const result = await productManager.paginate({ filter, sortAndPaginate });
      let products = result.docs.map((product) => product.toObject());

      const pagination = {
        page: result.page,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        totalPages: result.totalPages,
      };

      return response.render("index", {
        layout: "main",
        title: "CoderServer | Home ",
        products,
        pagination,
        user,
      });
    } else {
      return response.render("login", {
        layout: "loginLayout",
        title: "CoderServer | Login",
      });
    }
  } catch (error) {
    next(error);
  }
});

export default homeRouter;
