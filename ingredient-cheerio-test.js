const request = require('request');
const cheerio = require('cheerio');
const urls = require('./unique-urls');
const fs = require('fs');



let counter = 0;
var arr = [];
makeRequest(urls[0]);


function makeRequest(url) {
  console.log(`${counter} Making request to ${url}`);
  let row = url + ',';

  request(url, (error, response, body) => {
    counter++;
    if (error) console.log(error);
    const $ = cheerio.load(body);

    var $finalIngredients;

    // Find a list with at least 2 li items containing "ingredient" in the class
    var classMap = {};
    $('*[class*=ingredient], *[data*=ingredient]').each(function() {
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
      $finalIngredients = $(`.${divsWithOver3Matches[0].replace(' ', '.')}`).parent();
    } 

    if ($finalIngredients.length) {
      row += $finalIngredients.text();
    } else {
      console.log('No ingredients found');
    }

    fs.appendFile('./result.txt', row+'\n', () => {
      if (counter < 100) return makeRequest(urls[counter]);
      else return console.log('DONE!', arr);
    });


    function checkListForKeywords() {
      var $uls = $('ul');
      var ingredients = $uls.filter(ingFilter);
      if (!ingredients.length) ingredients= $('*[class*=ingredient]').filter(ingFilter);

      $finalIngredients = ingredients;

      function ingFilter(i, el, array) {
        return /(package|pkg|tablespoon|tbsp|teaspoon|tsp|ounces|cups|grams)/.test($(el).text());
      }
    }

  });
}




