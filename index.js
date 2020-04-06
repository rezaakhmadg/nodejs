'use strict';

const express   = require('express')
const bodyParser = require('body-parser')
const axios     = require('axios')

const server = express()
server.use(bodyParser.urlencoded({
    extended:true
}))
server.use(bodyParser.json());

const await     = require('await');
const translate = require('translate');

const Sentiment = require('sentiment');
const sentiment = new Sentiment();


translate.engine = 'google';
translate.key = 'AIzaSyAWZB-eFeo5mQt-dRuCvVeOeMgalpIgRdQ';

const token = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxMTQ4MTMsInRpbWVzdGFtcCI6IjIwMjAtMDMtMTNUMTc6NTQ6MTcuNDY0KzA3OjAwIn0.mpvSmT8_STMk7pz5PIxff1NMz4Zz1PGW-xr0_vqGNjs'
const url = 'https://api.chataja.co.id/api/v1/chat/conversations/'

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





