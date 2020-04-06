'use strict';


const await = require('await');
const translate = require('translate');

const Sentiment = require('sentiment');
const sentiment = new Sentiment();


translate.engine = 'google';
translate.key = 'AIzaSyAWZB-eFeo5mQt-dRuCvVeOeMgalpIgRdQ';
 
let text = "saya benci banget sama kamu";
translate(text, { from: 'id', to: 'en' }).then(textTranslate => {
    text=textTranslate  // Pingin di ganti isi text nya jadi english
    let result = sentiment.analyze(text);
    console.log(text)
    console.log(result)
  });

