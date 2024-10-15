const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('../models/user');
const { default: mongoose } = require('mongoose');
console.log(User);

require('dotenv').config();

console.log(process.env.GITHUB_CLIENT_ID + " github");
console.log("************************");



passport.use(new GitHubStrategy({
    clientID : process.env.GITHUB_CLIENT_ID,
    clientSecret : process.env.GITHUB_CLIENT_SECRET_KEY,
    callbackURL : '/auth/github/callback',

}, async (accessToken, refreshToken, profile, done)=>{
    //profile = JSON.stringify(profile, null, 2);
    console.log("\n new user login \n\n\n");
    console.log(profile);
    
    
    User.findOne({_id : profile.id})
    .then(async curruser =>{
        if(!curruser) {
        const newUser = new User({
            _id : profile.id,
            firstName : profile.displayName.split(' ')[0],
            lastName : profile.displayName.split(' ')[1],
            picture : profile.photos[0].value,
            email : profile.emails[0].value,
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