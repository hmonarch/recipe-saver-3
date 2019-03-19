var integrations = {
  'allrecipes.com.au': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.recipeIngredients ul > li')),
      desc: lisToArr($('ol[itemprop="recipeInstructions"] > li'))
    }
  },
  'allrecipes.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('ul[id*=lst_ingredients_] li label:not(#btn-addtolist)')),
      desc: lisToArr($('ol[itemprop="recipeInstructions"] > li'))
    }
  },
  'parade.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.recipe-content--wrapper .ingredients li.ingredient')),
      desc: lisToArr($('.recipe-content--wrapper .instructions > li'))
    }
  },
  'cooking.nytimes.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: formatIngSpaces($('.recipe-ingredients > li'), '.quantity', '.ingredient-name'),
      desc: lisToArr($('.recipe-steps > li'))
    }
  },
};


var result = integrations[window.location.host.replace(/^www\./, '')]();

console.log(result.img);
console.log(result.ing);
console.log(result.desc);


function formatIngSpaces($lis, qtySel, ingSel) {
  var arr = [];
  $lis.each(function() {
    var qty = $(this).find(qtySel).text().trim();
    var delimeter = qty ? ' ' : ''
    arr.push(qty + delimeter + $(this).find(ingSel).text().trim());
  });
  return arr;
}


function lisToArr($lis) {
  return [...$lis].map(li => $(li).text().trim());
}