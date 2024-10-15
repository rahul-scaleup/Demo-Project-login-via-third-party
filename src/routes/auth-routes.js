const express = require('express');
const passport = require('passport');
const googlePassportSetup = require('../config/google-passport-setup');
const facebookPassportSetup = require('../config/facebook-passport-setup');
const gitHubPassportSeup = require('../config/github-passport-setup');
//const session = require('express-session');


const router = express.Router();

router.get('/login', (req, res)=> {
    res.render('login');
});

router.get('/logout', (req, res)=> {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Could not log out' });
        }
        res.redirect('/');
    });
});


router.get('/google', 
    passport.authenticate('google', {
        scope : ['profile', 'email']
    })
);
router.get('/facebook', 
    passport.authenticate('facebook'//, {
       // scope : ['email', 'public_profile']
    //} app review is required in order to retrieve these info
    )
);

router.get('/github', passport.authenticate('github'));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile');
});

router.get('/facebook/callback', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/profile');
});

router.get('/github/callback', passport.authenticate('github'), (req, res) => {
    res.redirect('/profile');
});

module.exports = router;