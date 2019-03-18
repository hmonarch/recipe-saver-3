/*
https://www.davidlebovitz.com/recipe-pad-thai-recipe-thailand-noodles/
http://orangette.net/2016/10/october-3/
https://www.atasteofkoko.com/recipes/bucatini-bolognese

Here's one with no good way to detect inredients
https://deliciouslyella.com/2017/10/06/roast-veg-chickpea-stew/
https://discover.grasslandbeef.com/blog/herb-bone-marrow-butter-recipe/

if (.wprm-recipe-ingredients) for wordpress sites
if multiple ingredients lists then filter out duplicates


https://github.com/ssnepenthe/recipe-scraper/blob/master/SITE-SUPPORT.md
 */




var $finalIngredients;

// Find a list with at least 2 li items containing "ingredient" in the class
var classMap = {};
$('*[class*=ngredient], *[data*=ngredient]').each(function() {
  var $el = $(this);
  var className = $el[0].className;
  if (!classMap[className]) {
    classMap[className] = 0;
  }

  // If the current element's sibling has the same class increment the className in the map
  if ($el.next().length && $el.next()[0].className === className) {
    classMap[className]++;
  }
});

var divsWithOver3Matches = Object.keys(classMap).filter(item => {
  return classMap[item] >= 2;
});

if (divsWithOver3Matches.length === 0) {
  console.log('checkLisForKeyWords');
  checkListForKeywords();
} else {
  console.log('main check');

  console.log('?', divsWithOver3Matches)
  $finalIngredients = $(`.${divsWithOver3Matches[0].replace(' ', '.')}`).parent();
} 


console.log('$finalIngredients', $finalIngredients);


function checkListForKeywords() {
  var $uls = $('ul');
  var ingredients = $uls.filter(ingFilter);
  if (!ingredients.length) ingredients= $('*[class*=ingredient]').filter(ingFilter);

  $finalIngredients = ingredients;

  function ingFilter(i, el, array) {
    return /(package|pkg|tablespoon|tbsp|teaspoon|tsp|ounces|cups|grams)/.test($(el).text());
  }
}