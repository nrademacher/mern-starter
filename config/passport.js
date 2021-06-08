process.env.NODE_ENV === 'development' && require('dotenv').config();
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.SECRET;

module.exports = async (passport) => {
  passport.use(
    new JwtStrategy(options, async (jwtPayload, done) => {
      try {
        const user = await User.findById(jwtPayload.id);
        if (user) {
          // return the user to the frontend
          return done(null, user);
        } else {
          // return false since there is no user
          return done(null, false);
        }
      } catch (err) {
        console.log(err);
      }
    })
  );
};
