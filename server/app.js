const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('cloudinary');


// Express app / Middleware
const app = express();
app.use(bodyParser.json());

// TODO: Investigate if this is needed in production
app.use(cors());

// DB / Mongoose
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');

if (!process.env.PORT) {
  mongoose.connect('mongodb://localhost:27017/recipe-saver-3',  { useNewUrlParser: true });
} else {
  console.log('App running in heroku');
	const mongodbUri = process.env.MONGODB_URI;
	const mongooseUri = uriUtil.formatMongoose(mongodbUri);
  mongoose.connect(mongooseUri, { 
    useNewUrlParser: true, 
    server: { 
      socketOptions: { 
        keepAlive: 1, 
        connectTimeoutMS: 30000 
      }
    },
    replset: {
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS : 30000 
      }
    }
  });
}
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('Mongo connection succeeded'));

// Global constants
const user_id = process.env.PORT ? process.env.USER_ID : fs.readFileSync(`${__dirname}/../private/user_id.txt`).toString();
const cloudinarySecret = process.env.PORT ? process.env.CLOUDINARY_SECRET : fs.readFileSync(`${__dirname}/../private/cloudinary_secret.txt`).toString();
cloudinary.config({ 
  cloud_name: 'dormh2fvt', 
  api_key: '778489856867779', 
  api_secret: cloudinarySecret 
});
const cloudinaryOptions = { quality: 60, gravity: 'center', height: 570, width: 570, crop: 'fill', tags: ['recipe_saver'] };


const Recipe = require('./models/recipe');


// Get base page
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/../client/dist/index.html`);
});


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

  Recipe.find({user_id, tags: { '$elemMatch': { 'name': tagName }}}, 'title creationDate image', (err, recipes) => {
      if (err) console.error(err);
      res.send(recipes);
  })
  .collation({ locale: 'en' })
  .sort(sortObj(req.query.sort));
});


// Change tag color
app.post('/tag-color', (req, res) => {
  const { tagToUpdate, newColor } = req.body;

  Recipe.find({user_id, 'tags.name': tagToUpdate}, (err, recipes) => {

    saveRecipes(recipes);
  
    async function saveRecipes(recipes) {
      for (const recipe of recipes) {
        const targetTag = recipe.tags.find(tag => tag.name === tagToUpdate);
        targetTag.color = newColor;
        recipe.markModified('tags');
        await saveRecord(recipe);
      }

      res.json(recipes);
    }

    function saveRecord(doc) {
      return new Promise((resolve, reject) => {
        doc.save((err, saved) => {
          if (err) reject(err);
          resolve(saved);
        });
      });
    }
  });
});


// Fetch tags
app.get('/tags', (req, res) => {

  const { search } = req.query;

  Recipe.find({user_id}, (err, recipes) => {
    if (err) console.error(err);

    let tags = [];
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

    if (search && search !== 'null') { // Note that null will be a string
      tags = tags.filter(tag => {
        return tag.name.indexOf(search) > -1;
      });
    }

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
app.post('/recipe/:recipeID', upload.fields([{ name: 'image-asset' }]),(req, res) => {
  const { recipeID } = req.params;
  const { title, url, description, tags, favorite, image } = req.body;

  const imageAsset = req.files['image-asset'] && req.files['image-asset'][0].path;

  if (recipeID === 'new') {
    const newRecipe = new Recipe();
    newRecipe.user_id = user_id;
    addRecipe(newRecipe);
  } else {
    Recipe.findOne({ user_id, _id: recipeID}, (err, recipe) => {
      if (err) console.error(err);
      addRecipe(recipe);
    });
  }

  function addRecipe(recipe) {
    recipe.favorite = favorite;
    recipe.title = title;
    recipe.url = url;
    recipe.description = description;
    recipe.tags = JSON.parse(tags);


    cloudinary.uploader.upload(imageAsset || image, result => {
      if (imageAsset) fs.unlink(imageAsset, err => {});
      recipe.image = result.url;
      saveRecipe(recipe);
    },
    cloudinaryOptions);

    function saveRecipe(recipe) {
      recipe.save((err, recipe) => {
        if (err) console.error(err);
        res.json(recipe);
      });
    }
  }
});

// Delete recipe
app.delete('/recipe/:recipeID', (req, res) => {
  const { recipeID } = req.params;

  Recipe.findOne({ user_id, _id: recipeID}, (err, recipe) => {
    if (err) console.error(err);
    if (!recipe) return res.sendStatus(404);

    recipe.remove((err, data) => {
      if (err) console.error(err);
      res.json(data);
    });
  });
});


function sortObj(sort) {
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