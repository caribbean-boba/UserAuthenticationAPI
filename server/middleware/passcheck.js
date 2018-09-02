const User = require('../models/User');
module.exports = (req, res, next) => {
    console.log(req.body.email);
    User.forge({ email: req.body.email }).fetch().then(user => {
        if (user && user.admin !== 'web') {
           return res.status(401).end();
        } else {
            next();
        }
    });
};
