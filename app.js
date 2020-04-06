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
        
        axios.post(url+'post_comment',{
            access_token: token,
            topic_id:room_id,
            comment: "Score dari kata kamu adalah "+ myFunction()
        }).then((hsl)=>{
            console.log(hsl.data.data.username)
        }).catch((err)=>{
            //error
        })
    }

    async function myFunction(){
        msg = await translate(msg,{from: "id", to: "en"});
        let dibaca = sentiment.analyze(msg)
        // return dibaca.score;
        console.log(dibaca.score);
    }
    
})

server.listen((process.env.PORT || 3000), () => {
    console.log("Server is up and running...");
});