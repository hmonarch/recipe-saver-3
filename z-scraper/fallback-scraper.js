/* RULES
  Check for .wprm-recipe-instruction classes first
  Then run ingredirents > instructions script 
*/

var text = `   
RECIPES
BLOG
RACH’S GOODS
SHOWS
MAGAZINE
EVENTS
GIVING BACK
SHOP NOW
RECIPE
Traditional Tostadas
By Rachael Ray  •  March 15, 2019
Traditional Tostadas
Serves 4

This recipe originally appeared on the Rachael Ray Show. For more recipes and videos from the show visit RachaelRayShow.com.

Ingredients
For the salsa verde:
8 tomatillos
1 white onion, quartered and peeled
1 large jalapeño
1 poblano pepper
1 lime, juiced
2 cloves garlic in the jacket
1 lime, juiced
1 teaspoon ground cumin
1 teaspoon honey or light agave
A small handful of cilantro
Salt and pepper
For the refried beans:
1 tablespoon olive oil
1 small onion, chopped
1 jalapeño pepper, seeded and chopped
2 cloves garlic, chopped
Salt and pepper
1 teaspoon ground cumin
1 teaspoon ground coriander
½ cup water
1 teaspoon Frank’s RedHot cayenne pepper sauce
1 can pinto beans, drained
1 lime
2 tablespoons butter
For the beef:
1 tablespoon olive oil
1 pound ground beef
Salt and pepper
1 small onion, finely chopped
1 jalapeño pepper, finely chopped
2 cloves garlic, grated or finely chopped
1 teaspoon ground cumin, ⅓ palmful
1 teaspoon paprika, ⅓ palmful
1 teaspoon dried oregano, ⅓ palmful
1 vine or heirloom tomato, chopped
1 cup water
To serve:
8 corn tortillas and ½ cup frying oil to crisp, OR 8 store-bought tostadas (warmed in low oven)
Chopped lettuce
Mexican crema or sour cream
Crumbled cotija or queso fresco
Avocado dressed with lime juice
Scallions, thinly sliced on bias
Preparation

For the salsa verde, char the tomatillos, onion, peppers and garlic under boiler, then cool and peel and seed peppers and peel the garlic. Place the ingredients in food processor and puree with lime juice, cumin, honey or agave, cilantro, salt and pepper.

For the beans, heat oil in skillet over medium to medium-high heat, add onion, peppers, garlic, salt and pepper, cumin, coriander, and soften a few minutes. Add water, hot sauce and beans and simmer to absorb liquid, 10 minutes over low heat, then puree with juice of 1 lime. Wipe out skillet and melt butter, then add the puree and reduce beans 5 minutes until crisp at edges. Remove from heat and cover to keep warm.

For the beef, heat a skillet over medium-high heat with oil, 1 turn of the pan, brown and finely crumble the beef and season with salt and pepper. Add onion, jalapeno, garlic, cumin, paprika, oregano, tomato and water, simmer 10-15 minutes.

To serve, fry or warm tortillas and top with beans, beef, lettuce, salsa verde, crema, cheese, avocados and scallions.

BEEF DINNER LUNCH THE RACHAEL RAY SHOW
YOU MIGHT ALSO LIKE
RECIPE
Broccoli Rabe Hoagies
RECIPE
Roasted Jalapeño Poppers
RECIPE
Grilled Cheese with Jalapeno and Fire-Roasted Gazpacho
SERVE IN STYLE

Check out Rachael's must-have items from the Rachael Ray Store.

Rachael Ray Cookbooks
Pasta Tools
Rachael Ray Dinnerware
Drawer Organizers
Rachael Ray Pots
Juicers
Bakeware Sets
Rachael Ray Bakeware
Mixer Attachments
Spoon Rests
Cooking Tools
Rachael Ray Cookware
WHAT'S FRESH FROM @RACHAELRAY
ABOUT US FAQ COOKWARE HELP CONTACT US   
© 2019 Rachael Ray Digital LLC    |    IBA    |    Privacy    |    Terms & Conditions
 

Our site uses cookies to ensure you get the best experience on our website. Click here to learn how to manage cookies.

GOT IT`;



var ingredientsKeywords = ['cup','can','jar','package','ounce','pound','whole','tablespoon','teaspoon','salt','pinch','/','-','3/4','1/2','1/8','fresh','to taste','chops','container','1/4','3/8','5/8','1/4', 'tsp', 'tbsp', 'oz.'];

var directionsKeywords = ['aioloi', 'aged','adjust','braise','infuse','homogenize','blend','brush','line','lard','carmelize','peel','emulsify','preheat','rack','pan','grease','butter','medium','pan','stir','bowl','set','whisk','egg','mix','cook','saute','minute','heat','batter','oven','hot','bake','cut','tender','grill','cool','serving','cheese','mint','serve','season','salt','drain','dente','firm','lid','prepare','oil','grind','mash','squash','trim','ingredient','baking','foil','silicone','parchment','bag','small','pepper','drizzle','shake','moist','taste','add','sprinkle','spread','dry','place','bread','machine','start','raised','knead','raise','rise','spread','scrub','chunk','toss','chop','aside','brown','quench','reduce','roast','scald','sauce','seer','sift','skim','smoke','temper','zest','slice','flat','broil','fill','olive','tablespoon','oz','hand','water','separate','flour','coat','fridge','golden','fresh','ground','refresh','together','dice','rinse','melt','pour','squeeze','liquid','mince','combine','fluffy','pinch','apart','sheet','transfer','fry','film','cover','leave','juice','job','seed','top','off','on','decorate','mold','rub','crosshatch','knife','sharp','preheat','finely','processor','extract','stiff','nonstick'];


var hotSpots = [];
//var lines = text.split('\n');
var text = document.documentElement.innerText;
var lines = text.split('\n');

lines.forEach((line, i) => {
  var lineLower = line.toLowerCase();

  ingredientsKeywords.forEach(ing => {
    if (new RegExp(ing).test(lineLower) && line.length < 90) {
      console.log(i+1, line);
      hotSpots.push(i+1);
      if (beginsWithNumber(lineLower)) hotSpots.push(i+1);
      if (isLessThan90Chars(lineLower)) hotSpots.push(i+1);
    }
  });
});

var median = hotSpots[Math.floor(hotSpots.length / 2)];
console.log(lines[median-1]);
console.log('median', median);



// Rules
function beginsWithNumber(line) {
  if (/^\d+/.test(line)) {
    return true;
  }
}

function isLessThan90Chars(line) {
  if (line.length < 90) {
    return true;
  }
}


