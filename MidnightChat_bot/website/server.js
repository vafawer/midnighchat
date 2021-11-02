const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const cors = require('cors');
const config = require("../db/config/db.config.js");
app.use(express.json());
const ejs = require('ejs')

/* //From video for conection the DB to the admin panel
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql');



require('dotenv').config(); */



/* // Templating Engine
app.engine('hbs', exphbs( {extname: '.hbs' }));
app.set('view engine', 'hbs'); */

// Templating Engine
app.set('view engine', 'ejs');
app.set('views', './views');


//take db infos from server.js
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD, {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = require("../db/models");
const Role = db.role;
const User = db.users;
const Company = db.company
const Ad = db.ad;
const Creator = db.creators;

db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and Resync Db');
    initial();
});

// Initial DB informations
function initial() {

    // USERS
    User.create({
        "tg_id": "1234567",
        "tg_userName": "@Khada",
        "first_name": "qweqwe",
        "last_name": "asdasd",
        "email": "toto@gmail.com",
        "verif_code": "123456",
        "balance": "123456",
    });
    User.create({
        "tg_id": "2345678",
        "tg_userName": "@Khada2",
        "first_name": "asdasd",
        "last_name": "zxczxc",
        "email": "toto2@gmail.com",
        "verif_code": "234567",
        "balance": "234567",
    });    
    User.create({
        "tg_id": "3456789",
        "tg_userName": "@Khada3",
        "first_name": "zxczxc",
        "last_name": "qweqwe",
        "email": "toto3@gmail.com",
        "verif_code": "345678",
        "balance": "345678",
    });
    Creator.create({
        "tg_id": "3456789",
        "tg_userName": "@TOTO1",
        "first_name": "zxczxc",
        "last_name": "qweqwe",
        "email": "toto3@gmail.com",
        "verif_code": "345678",
        "balance": "345678",
    });
    Creator.create({
        "tg_id": "3456789",
        "tg_userName": "@TOTO2",
        "first_name": "zxczxc",
        "last_name": "qweqwe",
        "email": "toto3@gmail.com",
        "verif_code": "345678",
        "balance": "345678",
    });
    Creator.create({
        "tg_id": "3456789",
        "tg_userName": "@TOTO3",
        "first_name": "zxczxc",
        "last_name": "qweqwe",
        "email": "toto3@gmail.com",
        "verif_code": "345678",
        "balance": "345678",
    });


}


const corsOption = {
    origin: "http://localhost:3000/"
}

app.use(cors(corsOption));

global.appRoot = path.resolve(__dirname);
console.log(global.appRoot);


// Require routes
const authRoutes = require('./routes/auth.routes');
const usersRoutes = require('./routes/users.routes');
const applicationsRoutes = require('./routes/applications.routes');
const adsRoutes = require('./routes/ads.routes');
const companiesRoutes = require('./routes/companies.routes');
const messagesRoutes = require('./routes/messages.routes');
const adminRoutes = require('./routes/admin.routes');
const indexRoutes = require('./routes/index.routes');
const hirerRoutes = require('./routes/hirer.routes');

const { log } = require('console');
const { company } = require('../db/models');

// first part of the routes
app.use('/', authRoutes);
app.use('/', indexRoutes);
app.use('/users/', usersRoutes);
app.use('/companies/', companiesRoutes);
app.use('/ads/', adsRoutes);
app.use('/apps/', applicationsRoutes);
app.use('/messages/', messagesRoutes);
app.use('/admin', adminRoutes);
app.use('/', hirerRoutes);


router.get('/', function(req, res) {
    res.render('index');
    console.log(res);
    //__dirname : It will resolve to your project folder.
});

router.get('/signin', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/signin.html'));
    console.log(res);
    //__dirname : It will resolve to your project folder.
});


router.get('/profile', function(req, res) {
    res.sendFile(path.join(__dirname + '/views/profile.html'));
    console.log(res);
    //__dirname : It will resolve to your project folder.
});

router.get('/hirer', function(req, res) {
    res.render('hirer');
    console.log(res);
    //__dirname : It will resolve to your project folder.
});


router.get('/admin', function(req, res) {
    res.render('admin');
    console.log(res);
    //__dirname : It will resolve to your project folder.
});

/* router.get('/adduser', function(req, res) {
    res.render('add-user');
    console.log(res);
    //__dirname : It will resolve to your project folder.
}); */

//serve css files
app.use(express.static(__dirname + '/public'));

//add the router
app.use('/', router);
app.listen(3000, () => {
    console.log('Running at Port 3000');
});