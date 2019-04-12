var text = document.documentElement.innerText;
var lines = text.split('\n');

var ingredientsLine;
var instructionsLine;


lines.forEach((line, i) => {
  if (/^ingredients:?$/i.test(line)) {
    ingredientsLine = i;
  }

  if (/^(instructions|how to prepare|method|directions|preparation):?$/i.test(line)) {
    instructionsLine = i;
  }


});




console.log({ingredientsLine});
console.log({instructionsLine});

for (var i = ingredientsLine + 1; i < instructionsLine; i++) {
  if (lines[i].trim().length) {
    console.log(lines[i]);
  }
}


