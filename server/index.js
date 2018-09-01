const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = new express();
const passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
}
passport.use(new JwtStrategy(opts, function(jwt_payload, next) {
    const user = null;
    next(null,user);
}));


app.use(passport.initialize());

app.get('/', (req, res) => {
    res.send('Hello World');
})

const PORT = 3000;
app.listen(PORT);