// NOTE: Delete raw data after use for privacy reasons

const fs = require('fs');
const recipes = require('../recipes_backup.js');

console.log(recipes.length);

recipes.forEach(recipe => {
  recipe.title = recipe.recipeName || recipe.title;
  recipe.image = '';
  delete recipe.recipeName;
  delete recipe.servings;
  delete recipe.readyIn;
  delete recipe.cals;

  // No recipe seemed to have any ingredients but this could be used
  let ingList = '';
  if (recipe.ingredients && recipe.ingredients.length) {
    recipe.ingredients.forEach(ing => {
      ingList += `${ing}<br>`;
    });
    recipe.description = `${ingList}<br><br>${recipe.description}`;
  }
});

fs.writeFile('recipes_new.json', JSON.stringify(recipes), 'utf8', () => {
  console.log('done');
});

