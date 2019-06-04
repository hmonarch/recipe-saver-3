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

  // Create share link
  app.get('/api/share-recipe/:recipeID',  (req, res) => {

    // Encrypt recipe id
    const { recipeID } = req.params;
    const ciphertext = CryptoJS.Rabbit.encrypt(recipeID, CRYPTOJS_SECRET).toString();

    res.json({
      result: ciphertext
    });
  });

  // Retrieve shared recipe
  app.get('/api/share/:recipeCipher',  (req, res) => {

    // Encrypt recipe id
    const { recipeCipher } = req.params;
    console.log('recipeCipher', recipeCipher);

    // Decrypt
    const bytes = CryptoJS.Rabbit.decrypt(recipeCipher, CRYPTOJS_SECRET);
    const recipeID = bytes.toString(CryptoJS.enc.Utf8);

    console.log('Final id', recipeID);

    Recipe.findOne({  _id: recipeID }, (err, recipe) => {
      if (err) console.error(err);
      res.json(recipe);
    });
  });

};