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
      ing: lisToArr($('.recipe-ingredients > li')),
      desc: lisToArr($('.recipe-steps > li'))
    }
  },
  'emerils.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.li-checklist-items.ingredients > li.checklist-item')),
      desc: lisToArr($('.li-checklist-items.directions > li'))
    }
  },
  'food52.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('ul.recipe-list > li')),
      desc: lisToArr($('.recipe-lists > ol > li'))
    }
  },
  'hugsandcookiesxoxo.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.easyrecipe .ingredient')),
      desc: lisToArr($('.easyrecipe .instruction'))
    }
  },
  'recipes.sparkpeople.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('#ingredients span[itemprop="ingredients"]')),
      desc: lisToArr($('div[itemprop="recipeInstructions"]'))
    }
  },
  'smittenkitchen.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.jetpack-recipe-ingredient')),
      desc: lisToArr($('.jetpack-recipe-directions'))
    }
  },
  'tastykitchen.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('ul.ingredients > li')),
      desc: lisToArr($('span[itemprop="instructions"] > p'))
    }
  },
  'thepioneerwoman.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.list-ingredients:first > li')),
      desc: lisToArr($('div[id*="recipe-instructions"] .panel-body:first'))
    }
  },
  'jenelizabethsjournals.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.tasty-recipes-ingredients ul > li, .tasty-recipes-ingredients > p')),
      desc: lisToArr($('.tasty-recipes-instructions ol > li'))
    }
  },
  'whiteonricecouple.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.wprm-recipe-ingredient')),
      desc: lisToArr($('.wprm-recipe-instruction'))
    }
  },
  'aspicyperspective.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.wprm-recipe-ingredient, .ingredients > ul > .ingredient')),
      desc: lisToArr($('.wprm-recipe-instruction, .instructions > ol > li'))
    }
  },
  'budgetbytes.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.wprm-recipe-ingredient')),
      desc: lisToArr($('.wprm-recipe-instruction'))
    }
  },
  'chowhound.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.freyja_mainbody .gu3 .freyja_box > ul > li')),
      desc: lisToArr($('.freyja_mainbody .gu9 .fr_instruction_rec ol > li'), true)
    }
  },
  'cooks.com': () => {
    return {
      img: null, // This site has no images!
      ing: lisToArr($('span.ingredient')),
      desc: lisToArr($('.instructions'))
    }
  },
  'deliaonline.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('*[itemprop="recipeIngredient"]')),
      desc: lisToArr($('*[itemprop="recipeInstructions"] p'))
    }
  },
  'finecooking.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.recipe__ingredients > ul > li')),
      desc: lisToArr($('.recipe__preparation > ul > li'))
    }
  },
  'foodrepublic.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.ingredients-content ul > li[itemprop="recipeIngredient"]')),
      desc: lisToArr($('*[itemprop="recipeInstructions"] > li, *[itemprop="recipeInstructions"] > ol > li'))
    }
  },
  'geniuskitchen.com': () => {
    return {
      img: $('meta[name=og\\:image]').attr('content'),
      ing: lisToArr($('.recipe-ingredients__ingredient')),
      desc: lisToArr($('.recipe-directions__step'))
    }
  },
  'forkly.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.recipe-ingredients > ul > li')),
      desc: lisToArr($('.recipe-method > ul > li'))
    }
  },
  'inspiredtaste.net': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('span.itr-ingredients > p')),
      desc: lisToArr($('span.itr-directions > p'))
    }
  },
  'jamieoliver.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.ingred-list > li:not(.ingred-heading)')),
      desc: lisToArr($('.recipeSteps > li'))
    }
  },
  'justataste.com': () => {
    let ignoreLastInstruction = '';
    const $lastInstruction = $('.wprm-recipe-instruction-text:last');
    const isNotRealInstruction = $lastInstruction.text().indexOf('Did you make this recipe?') > 1;
    if (isNotRealInstruction) ignoreLastInstruction = ':not(:last)';

    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.wprm-recipe-ingredient')),
      desc: lisToArr($(`.wprm-recipe-instruction-text${ignoreLastInstruction}`))
    }
  },
  'kingarthurflour.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('*[itemprop="ingredients"]')),
      desc: lisToArr($('[itemprop="recipeInstructions"] > li'))
    }
  },
  'myfoodandfamily.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.krRDPIngreList')),
      desc: lisToArr($('.krRecipeDirectionsDest'), true)
    }
  },
  'laaloosh.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.wprm-recipe-ingredient')),
      desc: lisToArr($('.wprm-recipe-instruction'))
    }
  },
  'marthastewart.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.components-list > li label')),
      desc: lisToArr($('.directions-item'), true)
    }
  },
  'marthastewart.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.components-list > li label')),
      desc: lisToArr($('.directions-item'), true)
    }
  },
  'mrfood.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('ul.recipeIngredient > li, .recipeIngredients li')),
      desc: lisToArr($('.articleInstructionsDiv ol > li, .stepByStepInstructionsDiv ol > li'))
    }
  },
  'pauladeen.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('[itemprop="ingredients"]')),
      desc: lisToArr($('.directions__content > p'))
    }
  },
  'ricekrispies.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('[itemprop="ingredients"]')),
      desc: lisToArr($('[itemprop="recipeInstructions"]'), true)
    }
  },
  'seriouseats.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.ingredient')),
      desc: lisToArr($('.recipe-procedure'), true)
    }
  },
  'simplyrecipes.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.ingredient')),
      desc: lisToArr($('.recipe-method p'), true)
    }
  },
  'sixsistersstuff.com': () => {
    return {
      img: $('.wp-post-image:first').attr('src'),
      ing: lisToArr($('.ingredient')),
      desc: lisToArr($('.instruction'))
    }
  },
  'skinnytaste.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.ingredient')),
      desc: lisToArr($('.instructions li'))
    }
  },
  'taste.com.au': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.ingredient-description')),
      desc: lisToArr($('.recipe-method-section li'), true)
    }
  },
  'tasteofhome.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.recipe-ingredients__list > li')),
      desc: lisToArr($('.recipe-directions__item'))
    }
  },
  'the-girl-who-ate-everything.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.mv-create-ingredients li, .wprm-recipe-ingredient')),
      desc: lisToArr($('.mv-create-instructions p, .mv-create-instructions li, .wprm-recipe-instruction'))
    }
  },
  'themediterraneandish.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.tasty-recipes-ingredients li')),
      desc: lisToArr($('.tasty-recipes-instructions li'))
    }
  },
  'thereciperebel.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.wprm-recipe-ingredient')),
      desc: lisToArr($('.wprm-recipe-instruction'))
    }
  },
  'thespruceeats.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.ingredient')),
      desc: lisToArr($('.structured-project__steps li'))
    }
  },
  'twopeasandtheirpod.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.wprm-recipe-ingredient')),
      desc: lisToArr($('.wprm-recipe-instruction'))
    }
  },
  'vegetariantimes.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('[itemprop="recipeIngredient"]')),
      desc: lisToArr($('[itemprop="recipeInstructions"] p'), true)
    }
  },
  'weightwatchers.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.food-details-ingredients__list-item')),
      desc: lisToArr($('.food-details-instructions__text li, .food-details-notes__text'))
    }
  },
  'wholefoodsmarket.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.ingredient_ul li')),
      desc: lisToArr($('.field-name-field-recipe-directions .field-item'))
    }
  },
  'williams-sonoma.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('h2:contains(Ingredients:)').nextAll('ul').find('li')),
      desc: lisToArr($('.directions p'))
    }
  },
  'foodnetwork.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.o-Ingredients__a-Ingredient')),
      desc: lisToArr($('.o-Method__m-Step'))
    }
  },
  'foodnetwork.ca': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.recipe-ingredients p')),
      desc: lisToArr($('.recipeInstructions p'), true)
    }
  },
  'yummly.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.IngredientLine')),
      desc: null // Yummly doesn't show directions
    }
  }


};


/*

window.location.host.replace(/^www\./, '');

*/

var result = integrations[window.location.host.replace(/^www\./, '')]();

console.log(result.img);
result.ing.forEach(ing => console.log(ing));
console.log('---------');
result.desc.forEach(desc => console.log(desc));


function lisToArr($lis, removeStepNum) {

  const ingArr = [...$lis].map(li => {
    let text = $(li).text().trim().replace(/\s\s+/g, ' ');;
    if (removeStepNum) text = text.replace(/^(Step )?\d+\.?\s/i, '');
    return text;
  });

  return ingArr.filter(item => item);
}