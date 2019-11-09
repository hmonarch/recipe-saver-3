var ogs = require('open-graph-scraper');
var options = {'url': 'https://www.allrecipes.com/recipe/21014/good-old-fashioned-pancakes/'};
ogs(options, function (error, results) {
  console.log('error:', error); // This is returns true or false. True if there was a error. The error it self is inside the results object.
  console.log('results:', results);
});