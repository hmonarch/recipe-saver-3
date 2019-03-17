const request = require('request');
const cheerio = require('cheerio');
const urls = require('./unique-urls');



let counter = 0;
var arr = [];
makeRequest(urls[0]);


function makeRequest(url) {
  console.log(`${counter} Making request to ${url}`);
  request(url, (error, response, body) => {
    counter++;
    if (error) console.log(error);
    const $ = cheerio.load(body);
    arr.push($('h1').first().text());
    if (counter < 100) return makeRequest(urls[counter]);
    else return console.log('DONE!', arr);
  });
}

