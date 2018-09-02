const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = new express();
const parser = require('body-parser');
const passport = require('passport');
const routes = require('./routes/auth/auth');

app.get('/', (req, res) => {
    res.send('Hello World');
})
app.use(passport.initialize());
app.use(parser.urlencoded({
  extended: false
}));
app.use(parser.json());
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT);