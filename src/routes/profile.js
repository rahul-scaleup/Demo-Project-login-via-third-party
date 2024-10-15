const express = require('express');

const router = express.Router();

const authCheck = (req, res, next) => {
    if(!req.user) {
        res.redirect('/auth/login');
    }
    next();
}

router.get('/', authCheck, (req, res)=>{
    const firstName = req.user.firstName;
    const lastName = req.user.lastName;
    const dpurl = req.user.picture;
    res.send(`
        <h1> name : ${firstName + " " + lastName} </h1>
        <img src = "${dpurl}" alt="not fetching dp">
        <img src="https://lh3.googleusercontent.com/a/ACg8ocJDP5ZkBDolWPZXgpp4ZthwRawkdjc5HquToCfe64pM-VcT2Q=s96-c">
        <a href="/auth/logout"><button>logout</button></a>
        
        `);
});

module.exports = router;
