// NOTE: Delete raw data after use for privacy reasons

const fs = require('fs');
const recipes = require('./recipes_backup.js');

console.log(recipes.length);

recipes.forEach(recipe => {
  recipe.title = recipe.recipeName;
  recipe.image = '';
  delete recipe.recipeName;
  delete recipe.servings;
  delete recipe.readyIn;
  delete recipe.cals;
});

fs.writeFile('recipes_new.json', JSON.stringify(recipes), 'utf8', () => {
  console.log('done');
});

