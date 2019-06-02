const CryptoJS = require('crypto-js');
const fs = require('fs');
const Recipe = require('../models/recipe');
const User = require('../models/user');

const CRYPTOJS_SECRET = process.env.PORT ? process.env.CRYPTOJS_SECRET : fs.readFileSync(`${__dirname}/../private/cryptojs_secret.txt`).toString();



// Encrypt
// const ciphertext = CryptoJS.AES.encrypt('my messag22e', CRYPTOJS_SECRET);
// console.log('cipher', ciphertext.toString());
 
// // Decrypt
// const bytes = CryptoJS.AES.decrypt(ciphertext.toString(), CRYPTOJS_SECRET);
// const plaintext = bytes.toString(CryptoJS.enc.Utf8);
 
// console.log(plaintext);


module.exports = function(app) {

  app.get('/api/share-recipe/:recipeID',  (req, res) => {

    const { recipeID } = req.params;
    
    // Encrypt recipe id
    const ciphertext = CryptoJS.Rabbit.encrypt(recipeID, CRYPTOJS_SECRET).toString();

    res.json({
      result: ciphertext
    });
  });
};