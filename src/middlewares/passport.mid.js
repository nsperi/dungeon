import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import userManager from "../data/mongo/managers/usersManager.mongo.js";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";

passport.use(
    'register',
    new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, res, password, done) =>{
            try {
                if (!email || !password) {
                    const error = new Error('Please enter a valid email and password');
                    error.statusCode = 400;
                    return done(error);
                }
                const one = await userManager.readByEmail(email);
                if (one) {
                    const error = new Error('Bad auth');
                    error.statusCode = 401;
                    return done(error);
                }
                const hashPassword = createHash(password);
                req.body.password = hashPassword;
                const user = await userManager.create(req, body);
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    )
);
passport.use(
    'login',
    new LocalStrategy(
        { passReqToCallback: true, usernameField: "email" },
        async (req, email, password, done) =>{
            try {
                const one = await userManager.readByEmail(email);
                if (!one) {
                    const error = new Error('Bad auth');
                    error.statusCode = 401;
                    return done(error);
                }
                const verify = verifyHash(password, one.password);
                if (verify) {
                    //req.session.name = one.name;
                    //req.session.email = email;
                    //req.session.online = true;
                    //req.session.role = one.role;
                    //req.session.photo = one.photo;
                    //req.session.user_id = one._id;
                    const user = {
                        name: one.name,
                        email,
                        role: one.role,
                        photo: one.photo,
                        _id: one._id,
                        online: true,
                      };
                      const token = createToken(user);
                      user.token = token;
                      return done(null, user);
                }
                const error = new Error('Invalid credentials');
                error.statusCode = 401;
                return done(error);
            } catch (error) {
                return done(error);
            }
        }
    )
);

export default passport;