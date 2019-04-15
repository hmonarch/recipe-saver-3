const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/recipe-saver-3',  { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('Mongo connection succeeded'));

const user_id = fs.readFileSync('../private/user_id.txt').toString();
console.log('user_id', user_id);


const Recipe = require('./models/recipe');

// Fetch all recipes
app.get('/recipes/all', (req, res) => {

  Recipe.find({user_id}, 'title creationDate', (err, recipes) => {
    if (err) console.error(err);
    res.send(recipes);
  })
  .collation({ locale: 'en' })
  .sort(sortObj(req.query.sort));

});

// Fetch favorites recipes
app.get('/recipes/favorites', (req, res) => {
  Recipe.find({user_id, favorite: true}, 'title creationDate', (err, recipes) => {
    if (err) console.error(err);
    res.send(recipes);
  })
  .collation({ locale: 'en' })
  .sort(sortObj(req.query.sort));
});

// Fetch tags
app.get('/recipes/tags', (req, res) => {
  Recipe.find({user_id}, (err, recipes) => {
    if (err) console.error(err);

    const tags = [];
    const tagTracker = [];

    recipes.forEach(recipe => {
      if (!recipe.tags.length) return;
      recipe.tags.forEach(tag => {
        if (tagTracker.indexOf(tag.name) === -1) {
          tags.push(tag);
          tagTracker.push(tag.name);
        }
      });
    });

    res.send(tags);
  });
});


// Fetch untagged recipes
app.get('/recipes/untagged', (req, res) => {
  Recipe.find({user_id, tags: {$size: 0}}, 'title creationDate', (err, recipes) => {
    if (err) console.error(err);
    res.send(recipes);
  })
  .collation({ locale: 'en' })
  .sort(sortObj(req.query.sort));
});


// Fetch tag
app.get('/tag/:tagName', (req, res) => {
  const { tagName } = req.params;
  console.log(tagName);

  Recipe.find({user_id, tags: { '$elemMatch': { 'name': tagName }}}, 'title creationDate', (err, recipes) => {
      if (err) console.error(err);
      res.send(recipes);
  })
  .collation({ locale: 'en' })
  .sort(sortObj(req.query.sort));
});




function sortObj(sort) {
  console.log('sort', sort);
  switch(sort) {
    case 'oldest':
      return { creationDate: 1 };
    case 'newest':
      return { creationDate: -1 };
    case 'a - z':
      return { title: 1 };
    case 'z - a':
      return { title: -1 };
    default:
      return { creationDate: -1 };
  }
}





app.listen(process.env.PORT || 8081);