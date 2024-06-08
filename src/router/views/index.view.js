import { Router } from "express";

import homeRouter from "./home.view.js";
import cartsRouter from "./carts.view.js";
import chatRouter from "./chat.view.js";
import productsRouter from "./products.view.js";
import registerRouter from "./register.view.js";
import usersRouter from "./users.view.js";

const viewsRouter = Router();

viewsRouter.use("/", homeRouter);
viewsRouter.use("/carts/", cartsRouter);
viewsRouter.use("/chat", chatRouter);
viewsRouter.use("/products", productsRouter);
viewsRouter.use("/register", registerRouter);
viewsRouter.use("/users", usersRouter);

export default viewsRouter;
