/* --- Set dev or prod --- */
const site = 'https://localhost:3000/extension';



const moreEl = document.querySelector('#more');

moreEl.addEventListener('click', () => {
  moreEl.style.display = 'none';
  document.querySelector('#extra-data').style.display = 'block';
});



// When popup.us opens, send message to content script to extract recipe data
// On response, populate the extension form with the returned data
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {rsAction: 'extract'}, function(response) {

    console.info('Response', response);

  });
});