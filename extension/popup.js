/* --- Set dev or prod --- */
const site = 'https://localhost:8081/api/extension';

// Declare elements
const moreEl = document.querySelector('#more');
const form = document.querySelector('#recipe-form');
const titleInput = document.querySelector('#title');
const imageEl = document.querySelector('#image');
const urlInput = document.querySelector('#url');
const descEl = document.querySelector('#description');
const tagsInput = document.querySelector('#tags');
const initialViewEl = document.querySelector('#initial-view');
const successEl = document.querySelector('#success');
const errorEl = document.querySelector('#error');


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


  const xhr = new XMLHttpRequest();
  xhr.open('POST', site, true);
  xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8',);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log(xhr.responseText);
      initialViewEl.style.display = 'none';
      successEl.style.display = 'block';
      successEl.querySelector('#view-it a').setAttribute('href', `${site}/recipes/all?id=${JSON.parse(xhr.responseType)._id}`);
    } else if (xhr.readyState === 4 && xhr.status === 401) {
      initialViewEl.style.display = 'none';
      errorEl.style.display = 'block';
      console.log('Error:', xhr.responseText, xhr.status);
    } else if (xhr.readyState === 4) {
      initialViewEl.style.display = 'none';
      errorEl.style.display = 'block';
      errorEl.querySelector('#error-title').textContent = 'Oops';
      errorEl.querySelector('#sign-in-error').innerHTML = 'Something went wrong. Try signing into your account first.'
    }
  }
  xhr.send(JSON.stringify(data));
}