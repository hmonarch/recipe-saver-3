console.log('content.js');

// This script runs in the visited page that's open in Chrome
if (window.location.hostname === 'rs3-staging.herokuapp.com' || 
		window.location.hostname === 'www.recipesaver.net' ||
		window.location.hostname === 'www.recipesaver.me' ||
		window.location.hostname === 'localhost') {
	
	// var rs_id = $('#rs-id').attr('data-rs-id');
	//console.warn(rs_id);
	//
  // Save user id to storage
  chrome.storage.sync.set({'rs_id': rs_id}, function() {
    //console.log('rs_id saved');
  });

}


// Receive message from extension
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

	// Extract recipe
	if (request.rsAction === 'extract') {
		(async () => {
			const src = chrome.extension.getURL('./scraper/integrations.js');
			const scrape = await import(src);
			// This returns a module - the default property is the actual function
			const recipe = scrape.default();
			sendResponse(recipe);
		})();
	}

	// We need to return true to get around this error: "The message port closed before a response was received."
	return true; 
});










