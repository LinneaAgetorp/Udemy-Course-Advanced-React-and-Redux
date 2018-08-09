const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

// Create local strategy
const localOptions = {usernameField: 'email'};
const localLogin = new LocalStrategy( localOptions, function (email, password, done) {
    // Verify this email and password, call done with the user , if it is correct email and pwd
    // otherwise, call done and false
    User.findOne({ email: email.toLowerCase() }, function (err, user) {
        if(err) {
            return done(err)
        }
        if(!user) {
            return done(null, false) // user not found
        }

        // compare passwords, is "password" === user.password
        user.comparePassword(password, function (err, isMatch) {
            if(err) {
                return done(err)
            }
            if(!isMatch) {
                return done(null, false)
            }
            return done(null, user)
        })

    })
});

// Setup options for jwt strategy
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};


// Create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
    // See if user ID in the payload exists in our database
    // If it does, call 'done', with that user
    // otherwise, call done without a user object
    User.findById(payload.sub, (err, user ) => {
        if(err) {
            return done(err, false) // search failed
        }
        if (user) {
            done(null, user);   // found user
        } else {
            done(null, false);  // didn't find user
        }
    })
});


// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);