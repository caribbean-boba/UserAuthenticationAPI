const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = new express();
const passport = require('passport');
const parser = require('body-parser');
var JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const knex = require('knex');
const dbKnex = knex({client: 'pg', connection: 'postgresql://localhost:5432/jwt_test'});
const bookshelf = require('bookshelf');
const securePassword = require('bookshelf-secure-password');
const db = bookshelf(dbKnex);
const jwt = require('jsonwebtoken');
// encrypt the password
db.plugin(securePassword);
const User = db.Model.extend({
    tableName: 'login_user',
    hasSecurePassword: 'password_bash'
})
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
}
passport.use(new JwtStrategy(opts, function(jwt_payload, next) {
   User.forge({id: jwt_payload.id}).fetch().then(res=>{
        next(null,res);
    });
}));


app.use(passport.initialize());
app.use(parser.urlencoded({
  extended: false
}));
app.use(parser.json());
app.get('/', (req, res) => {
    res.send('Hello World');
})

app.post('/signup', (req, res) => {
    console.log(req);
    if (!req.body.email || !req.body.password || !req.body.admin) {
        return status(401).send('missing fields');
    }
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin,
    })
    user.save().then(() => res.send('ok'));
});

app.post ('/getToken', (req, res) => {
    console.log(req);
    if (!req.body.email || !req.body.password || !req.body.admin) {
      return res.status(401).send('missing fields');
    }

    if (req.body.admin !== 'web') {
        return res.status(401).send('I can not authorize you');
    }
    User.forge({ email: req.body.email }).fetch().then(result => {
      if (!result) {
        return res.status(400).send('user not found');
      }

      result.authenticate(req.body.password).then(user => {
        const payload = { id: user.id };
        const token = jwt.sign(payload, process.env.SECRET);
        res.send(token);
      }).catch(err => {
        return res.status(401).send({ err });
      });
    });
  }
);

app.get('/web', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('Only visible for web developer');
});

const PORT = 3000;
app.listen(PORT);