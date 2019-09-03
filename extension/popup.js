/* --- Set dev or prod --- */
const site = 'https://localhost:3000/extension';

// Declare elements
const moreEl = document.querySelector('#more');
const form = document.querySelector('#recipe-form');
const titleInput = document.querySelector('#title');
const imageEl = document.querySelector('#image');
const urlInput = document.querySelector('#url');
const descEl = document.querySelector('#description');
const tagsInput = document.querySelector('#tags');


// Show "More Details" on click
moreEl.addEventListener('click', () => {
  moreEl.style.display = 'none';
  document.querySelector('#extra-data').style.display = 'block';
});

// Handle form submit
form.addEventListener('submit', e => {
  e.preventDefault();
  sendToRS();
});

// When popup.us opens, send message to content script to extract recipe data
// On response, populate the extension form with the returned data
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {rsAction: 'extract'}, function(response) {
    console.info('Response', response);
    processResponse(response);
  });
});


function processResponse(response) {
  if (!response) return console.log('No response');

  // Title
  if (response.title) {
    titleInput.value = response.title;
  }

  // Image
  if (response.img) {
    imageEl.style.display = 'block';
    imageEl.setAttribute('src', response.img);
  } else {
    document.querySelector('#title-and-image').classList.add('no-image');
  }

  // URL
  if (response.url) {
    urlInput.value = response.url;
  }

  // Ingredients / Description
  if (response.desc && response.ing) {    
    const ingredients = response.ing.join('\n');
    const description = response.desc.join('\n');

    descEl.innerText = `${ingredients}\n\n\n${description}`;
    moreEl.click();
  }
}

function sendToRS() {
  const data = {
    user_id: null,
    title: titleInput.value,
    description: descEl.innerHTML,
    url: urlInput.value,
    image: (imageEl.style.display === 'block') ? imageEl.getAttribute('src') : null,
  };

  const tagsSplit = tagsInput.value.split(',');
  const tagsFiltered = tagsSplit.filter(tag => {
    if (tag.trim().length) {
      return true;
    }
  });
  const tagsTrimmed = tagsFiltered.map(tag => tag.trim());
  data.tags = tagsTrimmed;

  console.log('Sending to RS', data);
}