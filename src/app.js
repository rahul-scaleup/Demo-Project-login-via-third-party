const express = require('express');
const googlePassportSetup = require('./config/google-passport-setup');
const facebookPassportSetup = require('./config/facebook-passport-setup');
const gitHubPassportSeup = require('./config/github-passport-setup');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile');
const mongoose = require('mongoose');
const session = require('express-session');
//const cookieSession = require('cookie-session');
const passport = require('passport');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;
/*
app.use(cookieSession({
    keys: [process.env.COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 1000
}));

app.use(passport.initialize());
app.use(passport.session());
*/
// Session setup
app.use(session({ secret: process.env.COOKIE_KEY, resave: false, saveUninitialized: true }));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
    
});

app.use('/profile', profileRoutes);

app.use('/auth', authRoutes);

app.listen(port, ()=> {
    console.log(`app is listening at port ${port}`);
})

mongoose.connect('mongodb://127.0.0.1:27017/newProject1')
.then(()=>{
    console.log('connected to mongoDB');
})
.catch((err)=>{
    console.log(err);
});