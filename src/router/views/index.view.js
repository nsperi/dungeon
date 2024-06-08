import { Router } from "express";
import productsRouter from "./products.view.js";
import usersRouter from "./users.view.js";

const viewsRouter = Router();

viewsRouter.use("/products", productsRouter);
viewsRouter.use("/users", usersRouter);
viewsRouter.get("/", (req, res, next) => {
  try {
    return res.render("index", { title: "The Android's Dungeon" });
  } catch (error) {
    return next(error);
  }
});

export default viewsRouter;

