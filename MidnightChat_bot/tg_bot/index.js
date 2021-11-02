require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const telegramBot=require('node-telegram-bot-api');


const config = require("../db/config/db.config.js");

const app = express();
app.use(bodyParser.json());
app.use(express.json());

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
const User = db.users;
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

const {TOKEN, SERVER_URL} = process.env;

const TELEGRAM_API=`https://api.telegram.org/bot${TOKEN}`;
const URI = `/webhook/${TOKEN}`;
const WEBHOOK_URL = SERVER_URL+URI;




const init = async() => {
axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
.then(res=>{
    console.log(res.data);
  })  
  .catch(error=>{

  });
};

/* app.post(URI, async (req, res) => {
    console.log(req.body);

    const chatId = req.body.message.chat.id;
    const text = req.body.message.text;

    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: text
    })

    return res.send();
}); */





const bot = new telegramBot(TOKEN, { polling: true });

bot.on('message', (message) =>{
    console.log(message);
});

app.listen(process.env.PORT || 4000, async () => {
    console.log('App running on port', process.env.PORT || 4000)
    await init()
});