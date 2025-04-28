'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Declaring required dependencies

const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const methodOverride = require('method-override');
const engine = require('ejs-mate');

// NOTE: For future, use for user base

const flash = require('connect-flash');
const session = require('express-session');

// Declaring helper functions, classes

const AppError = require('./utilities/AppError.js');

// Minor configurations

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.engine('ejs', engine);

// Endpoints

app.get('/', (req, res, next) => {
    res.render('landing/main');
});

app.get('/secret', (req, res, next) => {
    res.render('construction/underConstruction');
});

// Setting up an error route

app.all(/[\s\S]*/, (req, res, next) => {
    next(new AppError(404, 'Page could not be found!'));
});

app.use((err, req, res, next) => {
    console.log(err);
    res.render('error/errorPage', { err });
});

// Starting up the listening port

app.listen(port, console.log(`App is now listening on port ${port}`));
