const cloudinary = require('cloudinary');
const fs = require('fs');

const cloudinarySecret = process.env.PORT ? process.env.CLOUDINARY_SECRET : fs.readFileSync(`${__dirname}/private/cloudinary_secret.txt`).toString();
cloudinary.config({ 
  cloud_name: 'dormh2fvt', 
  api_key: '778489856867779', 
  api_secret: cloudinarySecret 
});
const cloudinaryOptionsRecipe = { quality: 60, gravity: 'center', height: 570, width: 570, crop: 'fill', tags: ['recipe_saver'] };

const imagesToUpload = [
  'https://cookinginsens.files.wordpress.com/2012/02/img_5441b.jpg',
  'http://images.media-allrecipes.com/userphotos/960x960/6725607.jpg',
  'https://www.thedailymeal.com/sites/default/files/recipe/2016/Fake%20Shack%20Burger%20Recipe%20Shutterstock.jpg',
  'https://cheftjaart.com/wp-content/uploads/2016/07/Peach-and-Parma-ham-open-sandwich-1-1666x1156.jpg',
  'https://gimmedelicious.com/wp-content/uploads/2016/07/avocado-toast-7-of-13.jpg',
  'https://lilluna.com/wp-content/uploads/2019/04/fluffy-pancakes-5.jpg',
  'https://www.aheadofthyme.com/wp-content/uploads/2018/01/baked-sweet-potato-wedges-5.jpg',
  'https://www.countryrange.co.uk/wp-content/uploads/2016/02/MATURE-SLICED-CHEDDAR-_-GOURMET-ABERDEEN-ANGUS-BURGER-HI.jpg',
  'https://www.chicvegan.com/wp-content/uploads/2014/08/Poppers-2.jpg',
  'http://www.thecrepesofwrath.com/images/2014/05/Dijon_Roasted_Rack_of_Lamb/Dijon_Roasted_Rack_of_Lamb_2.jpg',
  'https://www.kawalingpinoy.com/wp-content/uploads/2015/06/eggplantspicy1a.jpg',
  'https://www.fifteenspatulas.com/wp-content/uploads/2011/08/Panna-Cotta-Fifteen-Spatulas-2-640x427.jpg',
];


let counter = 10;

function upload() {
  cloudinary.uploader.upload(imagesToUpload[counter], result => {
    console.log('cloudinary upload:', result.secure_url);
    counter++;
    if (counter < 12) {
      upload();
    } else console.log('DONE');
  },
  cloudinaryOptionsRecipe);
} 


upload();