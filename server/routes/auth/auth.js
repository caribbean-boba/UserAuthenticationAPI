const User = require('../../models/User');
const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
}
passport.use(new JwtStrategy(opts, function(jwt_payload, next) {
   User.forge({id: jwt_payload.id}).fetch().then(res=>{
        next(null,res);
    });
}));
router.post('/signup', (req, res) => {
    // console.log(req);
    if (!req.body.email || !req.body.password || !req.body.admin) {
        return res.status(401).send('missing fields');
    }
    const user = new User({
        email: req.body.email,
        password: req.body.password,
        admin: req.body.admin,
    })
    user.save()
    .then(() => res.send('successfully saved'))
    .catch(err => {
      res.status(401).send({ err });
    });
});

router.post ('/getToken', (req, res) => {
    // console.log(req);
    if (!req.body.email || !req.body.password) {
      return res.status(401).send('missing fields');
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

router.post ('/getWebToken', (req, res) => {
    // console.log(req);
    if (!req.body.email || !req.body.password) {
      return res.status(401).send('missing fields');
    }

    User.forge({ email: req.body.email }).fetch().then(result => {
      if (result.attributes.admin !== 'web') {
        return res.status(401).send('I can not authorize you since your admin is web');
      }
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

router.get('/web', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send('Only visible for web developer');
});

module.exports = router;