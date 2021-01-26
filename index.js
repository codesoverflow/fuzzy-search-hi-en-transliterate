//import { transliterate as tr } from 'transliteration';

const tr = require('transliteration').transliterate

const result = tr('उमा लहरी भजन आरती संग्रह', { replace: { from: "hi", to: "en" }});

console.log("resutl", result)