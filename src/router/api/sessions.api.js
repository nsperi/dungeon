import { Router } from "express";
import userManager from "../../data/mongo/managers/usersManager.mongo.js";
import passport from "../../middlewares/passport.mid.js";
import isAuth from "../../middlewares/isAuth.mid.js";
import passportCb from "../../middlewares/passportCb.mid.js";

const sessionsRouter = Router();

sessionsRouter.post(
  "/register",
  //passport.authenticate("register", { session: false }),
  passportCb('Register'),
  async (req, res, next) => {
    try {
      return res.json({ statusCode: 201, message: "Registered" });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.post(
  "/login",
  //passport.authenticate("login", { session: false }),
  passportCb('login'),
  async (req, res, next) => {
    try {
      return res.cookie('token', req.user.token, { signedCookie: true }).json({
        statusCode: 200,
        message: 'Logged in',
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.get(
  "/online",
  passportCb("jwt"),
  async (req, res, next) => {
    try {
      if (req.user.online) {
        return res.json({
          statusCode: 200,
          message: 'Is online!',
          user_id: req.session.user_id,
        });
      }
      return res.json({
        statusCode: 401,
        message: 'Bad auth',
      });
    } catch (error) {
      return next(error);
    }
  }
);

sessionsRouter.post("/logout", (req, res, next)=>{
  try {
    if(req.session) {
        req.session.destroy()
        return res.json({
            statusCode: 200,
            message: 'Signing out',
        })
    } else {
        return res.json({
            statusCode: 401,
            message: "Bad auth on logout"
        })
    }        
} catch (error) {
    return next(error)
}
})

export default sessionsRouter;
