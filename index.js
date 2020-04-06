'use strict';


const await = require('await');
const translate = require('translate');

const Sentiment = require('sentiment');
const sentiment = new Sentiment();


translate.engine = 'yandex';
translate.key = 'trnsl.1.1.20200405T051430Z.373fd13f6cc69764.f0924915e8275702bc94447ae3d6fc5dd2b199db';
 
let text = "saya benci banget sama kamu";
translate(text, { from: 'id', to: 'en' }).then(textTranslate => {
    text=textTranslate  // Pingin di ganti isi text nya jadi english
    let result = sentiment.analyze(text);
    console.log(text)
    console.log(result)
  });

