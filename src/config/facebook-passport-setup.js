const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/user');
const { default: mongoose } = require('mongoose');
console.log(User);

require('dotenv').config();

console.log(process.env.FACEBOOK_CLIENT_ID + "hiya");
console.log("************************");



passport.use(new FacebookStrategy({
    clientID : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET_KEY,
    callbackURL : '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'emails']

}, async (accessToken, refreshToken, profile, done)=>{
    //profile = JSON.stringify(profile, null, 2);
    console.log("\n new user login \n\n\n");
    //console.log(profile);
    console.log("value " + profile.photos[0].value );
    User.findOne({_id : profile.id})
    .then(async curruser =>{
        if(!curruser) {
        const newUser = new User({
            _id : profile.id,
            firstName : profile.displayName.split(' ')[0],
            lastName : profile.displayName.split(' ')[1],
            picture : profile.photos[0].value,
            email : "sample@email.com",
            emailVerified : true,
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