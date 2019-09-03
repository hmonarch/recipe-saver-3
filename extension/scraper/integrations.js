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
  },
  'bonappetit.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.ingredient')),
      desc:lisToArr($('.step'))
    }
  },
  'epicurious.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.ingredient')),
      desc:lisToArr($('.preparation-step'))
    }
  },
  // bettycrocker, pillsbury, and tablespoon use the same structure
  'bettycrocker.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('[itemprop="recipeIngredient"]'), null, new RegExp(/\sSave \$$/, 'i')),
      desc:lisToArr($('.recipePartStep'), true)
    }
  },
  'pillsbury.com': () => {
    return integrations['bettycrocker.com']();
  },
  'tablespoon.com': () => {
    return integrations['bettycrocker.com']();
  },
  // countryliving, delish, esquire, goodhousekeeping, womans day use the same structure
  'countryliving.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.ingredient-item')),
      desc:lisToArr($('.direction-lists li'))
    }
  },
  'delish.com': () => {
    return integrations['countryliving.com']();
  },
  'esquire.com': () => {
    return integrations['countryliving.com']();
  },
  'goodhousekeeping.com': () => {
    return integrations['countryliving.com']();
  },
  'womansday.com': () => {
    return integrations['countryliving.com']();
  },
  'bhg.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.ingredients-item')),
      desc:lisToArr($('.instructions-section p'))
    }
  },
  'eatingwell.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('[itemprop="ingredients"]')),
      desc: lisToArr($('ol[itemprop="recipeInstructions"] > li'))
    }
  },
  'rachaelraymag.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('[itemprop="recipeIngredient"]')),
      desc: lisToArr($('[itemprop="recipeInstructions"] p'), true)
    }
  },
  'cookingchanneltv.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.o-Ingredients__a-ListItemText')),
      desc: lisToArr($('.o-Method__m-Body p'))
    }
  },
  // cookinglight, myrecipes, foodandwine, health, realsimple, and southernliving use the same structure
  'cookinglight.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.ingredients li')),
      desc: lisToArr($('.step p'))
    }
  },
  'myrecipes.com': () => {
    return integrations['cookinglight.com']();
  },
  'foodandwine.com': () => {
    return integrations['cookinglight.com']();
  },
  'health.com': () => {
    return integrations['cookinglight.com']();
  },
  'realsimple.com': () => {
    return integrations['cookinglight.com']();
  },
  'southernliving.com': () => {
    return integrations['cookinglight.com']();
  },
  'tasty.co': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.ingredients__section li')),
      desc: lisToArr($('.prep-steps li'))
    }
  },
  'hellofresh.com': () => {
    var recipeKey = Object.keys(window.rootInitialState.recipes)[0];
    var recipe = window.rootInitialState.recipes[recipeKey];
    var desc = recipe.steps.map(item => item.instructions.replace(/\n/g, ' '));

    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: JSON.parse(document.querySelector('#schema-org').textContent).recipeIngredient,
      desc
    }
  },
  'thekitchn.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('[itemprop="recipeIngredient"]')),
      desc: lisToArr($('[itemprop="recipeInstructions"]'))
    }
  },
  'bbc.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.recipe-ingredients__list-item')),
      desc: lisToArr($('.recipe-method__list-item'))
    }
  },
  'wellplated.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.wprm-recipe-ingredient'), null, new RegExp(/\n/, 'g'), ' '),
      desc: lisToArr($('.wprm-recipe-instruction-text'))
    }
  },
  'pinchofyum.com': () => {
    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('.tasty-recipes-ingredients li')),
      desc: lisToArr($('.tasty-recipes-instructions li'))
    }
  },
  'traderjoes.com': () => {

    // Add text to DOM to convert characters like TJ&rsquo;s
    var scriptEl = $('script[type="application/ld+json"]').first();
    var data = JSON.parse(scriptEl[0].textContent);
    var ingredientMarkup = '<ul id="rs-data-ing" style="display: none;">';
    var instructionsMarkup = '<ul id="rs-data-ins" style="display: none;">';

    data.recipeIngredient.forEach(item => {
      ingredientMarkup += `<li>${item}</li>`;
    });
    ingredientMarkup += '</ul>';
    if (!$('#rs-data-ing li').length) {
      document.body.insertAdjacentHTML('afterbegin', ingredientMarkup);
    }

    data.recipeInstructions.split('\n').forEach(item => {
      instructionsMarkup += `<li>${item}</li>`;
    });
    instructionsMarkup += '</ul>';
    if (!$('#rs-data-ins li').length) {
      document.body.insertAdjacentHTML('afterbegin', instructionsMarkup);
    }

    return {
      img: $('meta[property=og\\:image]').attr('content'),
      ing: lisToArr($('#rs-data-ing li')),
      desc: lisToArr($('#rs-data-ins li')),
    }
  },

  
};


function lisToArr($lis, removeStepNum, rule, replaceStr = '') {
  const ingArr = Array.from($lis).map(li => {
    let text = $(li).text().trim().replace(/\s\s+/g, ' ');
    if (removeStepNum) text = text.replace(/^(Step )?\d+\.?\s/i, '');
    if (rule) text = text.replace(rule, replaceStr);
    return text;
  });

  return ingArr.filter(item => item);
}

function getDefaultData() {
  return {
    img: $('meta[property=og\\:image]').attr('content')
  }
}


export default function scrape() {
  var hostSite = window.location.host.replace(/^www\./, '');
  var integration = integrations[hostSite];

  let recipe;
  recipe = (integration) ? integration() : getDefaultData();

  // Set title
  recipe.title = $('title').text().trim().replace(/\s([|\-—:>•·~\[,]+|(by|from|recipe)?)\s.*/, '');

  // Set URL
  recipe.url = window.location.href;

  return recipe;
}