'use strict';

/* Define Library*/
const express   = require('express')
const bodyParser = require('body-parser')
const axios     = require('axios')
require('dotenv').config()

const translate = require('translate');
const Sentiment = require('sentiment');
const sentiment = new Sentiment();
const send = require('./lib/sendMsg');
/*End of Define Library */

const server = express()
server.use(bodyParser.urlencoded({
    extended:true
}))
server.use(bodyParser.json());

translate.engine = `${process.env.translate_engine}`
translate.key = `${process.env.translate_key}`

const token = `${process.env.access_token}`
const url = `${process.env.apiUrl}`


server.post('/',(req,res)=>{
    let room_id = res.req.body.chat_room.qiscus_room_id
    let msg = res.req.body.message.text
    let nama = res.req.body.from.fullname
    
    if(msg !== null ){
        translate(msg, { from: 'id', to: 'en' }).then(text => {
            console.log(text);
            let dibaca = sentiment.analyze(text)
            send.Txt("Score dari kata kamu adalah "+ dibaca.score,room_id)
        });
    }

    
})

server.listen((process.env.PORT || 3000), () => {
    console.log("Server is up and running...");
});