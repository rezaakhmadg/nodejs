require('dotenv').config()
const token = `${process.env.access_token}`
const apiUrl = `${process.env.apiUrl}`

const axios = require('axios');

module.exports = {
    Txt: (msg, room_id) => {
        axios.post(apiUrl + 'post_comment', {
            access_token: token,
            topic_id: room_id,
            type: 'text',
            comment: msg
        })
    },
    Btn: (room_id, payload) => {
        axios.post(apiUrl + 'post_comment', {
            access_token: token,
            topic_id: room_id,
            type: 'buttons',
            payload: JSON.stringify(payload)
        });
    },
    Carousel: (room_id, payload) => {
        axios.post(apiUrl + 'post_comment', {
            access_token: token,
            topic_id: room_id,
            type: 'carousel',
            payload: JSON.stringify(payload)
        });
    },
    Card: (room_id, payload) => {
        axios.post(apiUrl + 'post_comment', {
            access_token: token,
            topic_id: room_id,
            type: 'card',
            payload: JSON.stringify(payload)
        })
    },
    Files:(room_id,payload,comment)=>{
        axios.post(apiUrl + 'post_comment', {
            access_token: token,
            topic_id: room_id,
            type: 'file_attachment',
            payload: JSON.stringify(payload)
        })
    }

}