const CryptoJS = require('crypto-js');
const fs = require('fs');
const Recipe = require('../models/recipe');
const User = require('../models/user');
const mongoose = require('mongoose');

const CRYPTOJS_SECRET = process.env.PORT ? process.env.CRYPTOJS_SECRET : fs.readFileSync(`${__dirname}/../private/cryptojs_secret.txt`).toString();


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
  app.get('/api/get-shared/:recipeCipher',  (req, res) => {

    // Encrypt recipe id
    let { recipeCipher } = req.params;
    
    Recipe.findOne({  _id: getDecryptedID(recipeCipher) }, (err, recipe) => {
      if (err) console.error(err);
      res.json(recipe);
    });
  });

  // Add shared recipe
  app.get('/api/add-shared/:recipeCipher',  (req, res) => {

    // Encrypt recipe id
    let { recipeCipher } = req.params;
    const recipeID = getDecryptedID(recipeCipher)
    const userID = req && req.session && req.session.passport && req.session.passport.user && req.session.passport.user._id;

    User.findOne({ _id: userID }, (err, user) => {
      if (!user) {
        return res.json({
          error: 'User not logged in'
        });
      } else {
        Recipe.findOne({ _id: recipeID }, (err, recipe) => {
          const recipeClone = recipe;
          recipeClone._id = mongoose.Types.ObjectId();
          recipeClone.isNew = true;
          recipeClone.user_id = user._id;
          recipeClone.favorite = false;
          recipeClone.tags = [];
          recipeClone.creationDate = new Date();
          recipeClone.save((err, record) => {
            return res.json({
              recipeID: record._id 
            });
          });
        });
      }
    });
  });

};


function getDecryptedID(recipeCipher) {
  const bytes = CryptoJS.Rabbit.decrypt(decodeURIComponent(recipeCipher), CRYPTOJS_SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
}