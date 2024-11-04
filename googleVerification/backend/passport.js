require('dotenv').config();
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const Users = require('./models/Users');
const {raw} = require("express");


passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback"
    },
    async function(accessToken, refreshToken, profile, cb) {
        try {
            let user = await Users.findOne({googleId: profile.id});
            if (!user){
                user = await Users.create({
                    googleId:profile.id,
                    displayName:profile.displayName,
                    email:profile.emails[0].value,
                    profilePicture:profile.photos[0].value
                })
            }
                return cb(null,user);
        }catch (error){
            return cb(error,null);
        }
    }
));


passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
})


module.exports=passport;