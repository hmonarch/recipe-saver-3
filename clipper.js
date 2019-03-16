/*
https://www.davidlebovitz.com/recipe-pad-thai-recipe-thailand-noodles/
http://orangette.net/2016/10/october-3/

 */

var $uls = $('ul');
var ingredients = $uls.filter(ingFilter);
if (!ingredients.length) ingredients= $('*[class*=ingredients]').filter(ingFilter);


ingredients[0];


function ingFilter(i, el, array) {
  return /(package|pkg|tablespoon|tbsp|teaspoon|tsp|ounces|cups|grams)/.test($(el).text());
}

