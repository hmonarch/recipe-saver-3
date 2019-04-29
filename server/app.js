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

  Recipe.find({user_id}, 'title creationDate image', (err, recipes) => {
    if (err) console.error(err);
    res.send(recipes);
  })
  .collation({ locale: 'en' })
  .sort(sortObj(req.query.sort));

});

// Fetch favorites recipes
app.get('/recipes/favorites', (req, res) => {
  Recipe.find({user_id, favorite: true}, 'title creationDate image', (err, recipes) => {
    if (err) console.error(err);
    res.send(recipes);
  })
  .collation({ locale: 'en' })
  .sort(sortObj(req.query.sort));
});


// Fetch untagged recipes
app.get('/recipes/untagged', (req, res) => {
  Recipe.find({user_id, tags: {$size: 0}}, 'title creationDate image', (err, recipes) => {
    if (err) console.error(err);
    res.send(recipes);
  })
  .collation({ locale: 'en' })
  .sort(sortObj(req.query.sort));
});


// Fetch tag
app.get('/recipes/tag/:tagName', (req, res) => {
  const { tagName } = req.params;
  console.log(tagName);

  Recipe.find({user_id, tags: { '$elemMatch': { 'name': tagName }}}, 'title creationDate image', (err, recipes) => {
      if (err) console.error(err);
      res.send(recipes);
  })
  .collation({ locale: 'en' })
  .sort(sortObj(req.query.sort));
});


// Fetch tags
app.get('/tags', (req, res) => {
  Recipe.find({user_id}, (err, recipes) => {
    if (err) console.error(err);

    const tags = [];
    const tagTracker = [];

    recipes.forEach(recipe => {
      if (!recipe.tags.length) return;
      recipe.tags.forEach(tag => {
        
        // If the tag was not already in the tag tracker add it to our tags
        const index = tagTracker.indexOf(tag.name);
        if (index === -1) {
          tag.count = 1;
          tags.push(tag);
          tagTracker.push(tag.name);
        } else {
          tags[index].count++;
        }
      });
    });

    res.send(tags);
  });
});

// Fetch single recipe
app.get('/recipe/:recipeID', (req, res) => {
  const { recipeID } = req.params;

  Recipe.findOne({ user_id, _id: recipeID}, (err, recipe) => {
    if (err) console.error(err);
    res.send(recipe);
  });
});


// Edit recipe
app.post('/recipe/:recipeID', (req, res) => {
  const { recipeID } = req.params;
  const { title, url, description, tags, favorite } = req.body;

  Recipe.findOne({ user_id, _id: recipeID}, (err, recipe) => {
    if (err) console.error(err);
    recipe.favorite = favorite;
    recipe.title = title;
    recipe.url = url;
    recipe.description = description;
    recipe.tags = tags;

    recipe.save((err, recipe) => {
      if (err) console.error(err);
      console.log('Recipe saved!');
      res.json(recipe);
    });
  });
});


// Delete recipe
app.delete('/recipe/:recipeID', (req, res) => {
  const { recipeID } = req.params;

  Recipe.findOne({ user_id, _id: recipeID}, (err, recipe) => {
    if (err) console.error(err);
    if (!recipe) return res.sendStatus(404);

    recipe.remove((err, data) => {
      if (err) console.error(err);
      console.log('Recipe delete!');
      res.json(data);
    });
  });
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