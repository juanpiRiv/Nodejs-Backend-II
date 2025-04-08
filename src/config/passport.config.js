const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../dao/models/user.model');
const UserManager = require('../dao/managers/userManager');

const userManager = new UserManager();

// Configuración para extraer el token JWT de las cookies
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies[process.env.JWT_COOKIE_NAME];
    }
    return token;
};

const initializePassport = () => {
    // Estrategia local para login
    passport.use('login', new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await userManager.getUserByEmail(email);

                if (!user) {
                    return done(null, false, { message: 'Usuario no encontrado' });
                }

                if (!user.isValidPassword(password)) {
                    return done(null, false, { message: 'Contraseña incorrecta' });
                }

                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));
};

    // Estrategia current para extraer usuario del token
    passport.use('current', new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
            secretOrKey: process.env.JWT_SECRET
        },
        async (jwt_payload, done) => {
            try {
                const user = await userManager.getUserById(jwt_payload.sub);
                if (!user) {
                    return done(null, false, { message: 'Usuario no encontrado' });
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));

/*
comentamos ya que nose usan sesiones
    // Serializar y deserializar usuario para sesiones
    // passport.serializeUser((user, done) => {
    //     done(null, user._id);
    // });

    // passport.deserializeUser(async (id, done) => {
    //     try {
    //         const user = await userManager.getUserById(id);
    //         done(null, user);
    //     } catch (error) {
    //         done(error);
    //     }
    // });
*/


module.exports = initializePassport;
