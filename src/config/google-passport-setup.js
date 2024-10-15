const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
const { default: mongoose } = require('mongoose');
console.log(User);

require('dotenv').config();

//console.log(process.env.GOOGLE_CLIENT_ID + "hiya");
//console.log("************************");



passport.use(new GoogleStrategy({
    clientID : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET_KEY,
    callbackURL : '/auth/google/callback'

}, async (accessToken, refreshToken, profile, done)=>{
    //console.log(profile);
    User.findOne({_id : profile.id})
    .then(async curruser =>{
        if(!curruser) {
        const newUser = new User({
            _id : profile.id,
            firstName : profile.displayName.split(' ')[0],
            lastName : profile.displayName.split(' ')[1],
            picture : profile._json.picture,
            email : profile._json.email,
            emailVerified : profile._json.email_verified,
        });
        await newUser.save();
        console.log(newUser);
        done(null, newUser);
    }else{
        console.log("iser already exist");
        console.log(curruser);
        done(null, curruser);
    }
    });
    
    
    
}));



passport.serializeUser((user, done)=>{
   // console.log(user.id);
    done(null, user._id);
});

passport.deserializeUser((_id, done)=>{
    User.findById(_id)
    .then((user)=>{
        //console.log(user);
        done(null, user);
    });
});


module.exports = passport;