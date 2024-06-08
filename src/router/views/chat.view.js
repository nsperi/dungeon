import { Router } from "express";

const chatRouter = Router();

chatRouter.get("/", async (_request, response, next) => {
  try {
    return response.render("chat", { title: "Coderserver | Chat" });
  } catch (error) {
    next(error);
  }
});

export default chatRouter;
