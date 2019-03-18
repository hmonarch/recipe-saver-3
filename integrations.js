var integrations = {
  'allrecipes.com.au': () => {
    return {
      ing: $('.recipeIngredients ul').text(),
      desc: $('ol[itemprop="recipeInstructions"]').text()
    }
  }
};


var result = integrations[window.location.host]();



console.log(formatIngredientText(result.ing), result.desc);

function formatIngredientText(str) {
  var splitStr = str.split('\n');
  var filteredSplitStr = splitStr.filter(str => str.trim());
  return filteredSplitStr.map(str => str.trim());
}


