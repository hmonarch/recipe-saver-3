const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const cloudinary = require('cloudinary');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');


const userInViews = require('./middleware/userInViews');
const authRouter = require('./routes/auth');


// DB / Mongoose
const mongoose = require('mongoose');
const uriUtil = require('mongodb-uri');
const MongoStore = require('connect-mongo')(session);

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
    }
  });
}
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('Mongo connection succeeded'));

// Configure MongoStore options
let mongoStoreOptions;
if (!process.env.PORT) {
  mongoStoreOptions = {
    url: 'mongodb://localhost/recipe-saver-3',
  };
} else {
	mongoStoreOptions = {
		url: process.env.MONGODB_URI,
		ttl: 365 * 24 * 60 * 60,
	};
}

// Express app / Middleware
const app = express();
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/client/dist`));
app.use(bodyParser.json());
app.use(session({
  secret: 'cj-the-cat',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new MongoStore(mongoStoreOptions)
}));


// TODO: Investigate if this is needed in production
app.use(cors());

// Global constants
const user_id = process.env.PORT ? process.env.USER_ID : fs.readFileSync(`${__dirname}/private/user_id.txt`).toString();
const AUTH0_CLIENT_ID = process.env.PORT ? process.env.AUTH0_CLIENT_ID : fs.readFileSync(`${__dirname}/private/auth0_client_id.txt`).toString();
const AUTH0_DOMAIN = process.env.PORT ? process.env.AUTH0_DOMAIN : fs.readFileSync(`${__dirname}/private/auth0_domain.txt`).toString();
const AUTH0_CLIENT_SECRET = process.env.PORT ? process.env.AUTH0_CLIENT_SECRET : fs.readFileSync(`${__dirname}/private/auth0_client_secret.txt`).toString();
const cloudinarySecret = process.env.PORT ? process.env.CLOUDINARY_SECRET : fs.readFileSync(`${__dirname}/private/cloudinary_secret.txt`).toString();
cloudinary.config({ 
  cloud_name: 'dormh2fvt', 
  api_key: '778489856867779', 
  api_secret: cloudinarySecret 
});
const cloudinaryOptions = { quality: 60, gravity: 'center', height: 570, width: 570, crop: 'fill', tags: ['recipe_saver'] };


const strategy = new Auth0Strategy(
  {
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    callbackURL:
      process.env.PORT ? process.env.AUTH0_CALLBACK_URL : 'http://localhost:8080/callback'
  },
  function (accessToken, refreshToken, extraParams, profile, done) {
    // accessToken is the token to call Auth0 API (not needed in the most cases)
    // extraParams.id_token has the JSON Web Token
    // profile has all the information from the user
    return done(null, profile);
  }
);

passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

const Recipe = require('./models/recipe');

app.use('/', authRouter);
app.use('/test', userInViews());

// Get base page
app.get(['/', '/recipes', '/recipes/:category', '/recipes/tag/:tagname'], (req, res) => {
  console.log('just the base page');
  res.sendFile(`${__dirname}/client/dist/index.html`);
});

app.get('/test', (req, res) => {
  console.log('/test', res.locals.user);
  res.sendStatus(200);
});


// Fetch all recipes
app.get('/api/recipes/all', (req, res) => {

  Recipe.find({user_id}, 'title creationDate image', (err, recipes) => {
    if (err) console.error(err);
    res.send(recipes);
  })
  .collation({ locale: 'en' })
  .sort(sortObj(req.query.sort));

});

// Fetch favorites recipes
app.get('/api/recipes/favorites', (req, res) => {
  Recipe.find({user_id, favorite: true}, 'title creationDate image', (err, recipes) => {
    if (err) console.error(err);
    res.send(recipes);
  })
  .collation({ locale: 'en' })
  .sort(sortObj(req.query.sort));
});


// Fetch untagged recipes
app.get('/api/recipes/untagged', (req, res) => {
  Recipe.find({user_id, tags: {$size: 0}}, 'title creationDate image', (err, recipes) => {
    if (err) console.error(err);
    res.send(recipes);
  })
  .collation({ locale: 'en' })
  .sort(sortObj(req.query.sort));
});


// Fetch tag
app.get('/api/recipes/tag/:tagName', (req, res) => {
  const { tagName } = req.params;

  Recipe.find({user_id, tags: { '$elemMatch': { 'name': tagName }}}, 'title creationDate image', (err, recipes) => {
      if (err) console.error(err);
      res.send(recipes);
  })
  .collation({ locale: 'en' })
  .sort(sortObj(req.query.sort));
});


// Change tag color
app.post('/api/tag-color', (req, res) => {
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
app.get('/api/tags', (req, res) => {

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
app.get('/api/recipe/:recipeID', (req, res) => {
  const { recipeID } = req.params;

  Recipe.findOne({ user_id, _id: recipeID}, (err, recipe) => {
    if (err) console.error(err);
    res.send(recipe);
  });
});

app.get('/api/search/:term', (req, res) => {

  const { term } = req.params;

  Recipe.find({ user_id }, 'id title tags', { sort: { title: 1 }}, (err, recipes) => {
    if (err) console.error(err);

    const recipeResults = [];
    const tagResults = [];

    recipes.forEach(recipe => {
      // Capture recipe results
      if (recipe.title.toLowerCase().indexOf(term.toLowerCase()) > -1) {
        recipeResults.push(recipe);
      }

      // Capture tag reults
      recipe.tags.forEach(tag => {
        if (tag.name.toLowerCase().indexOf(term.toLowerCase()) > -1) {
          const isCaptured = tagResults.some(tagResult => tagResult.name.toLowerCase() === tag.name.toLowerCase());
          if (!isCaptured) tagResults.push(tag);
        }
      });
    });

    // Sort results by name first
    recipeResults.sort((a, b) => sortFn(a, b, 'title'));
    tagResults.sort((a, b) => sortFn(a, b, 'name'));

    function sortFn(a, b, criteria) {
      if (a[criteria].toLowerCase() < b[criteria].toLowerCase()) return -1; 
      if (a[criteria].toLowerCase() > b[criteria].toLowerCase()) return 1; 
      return 0;
    }

    // Move exact matches to the top of the list
    recipeResults.forEach((item, index) => prioritizeExactMatch(item, index, 'title', recipeResults));
    tagResults.forEach((item, index) => prioritizeExactMatch(item, index, 'name', tagResults));

    function prioritizeExactMatch(item, index, criteria, arr) {
      if (term.toLowerCase() === item[criteria].toLowerCase()) {
        arr.unshift(arr.splice(index, 1)[0]);
      }
    }

    res.json({ recipeResults, tagResults });
  });
});


// Update recipe
app.post('/api/recipe/:recipeID', upload.fields([{ name: 'image-asset' }]),(req, res) => {
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
app.delete('/api/recipe/:recipeID', (req, res) => {
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