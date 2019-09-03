// This script runs in the visited page that's open in Chrome
if (window.location.hostname === 'recipesaver.herokuapp.com' || window.location.hostname === 'www.recipesaver.net' || window.location.hostname === '127.0.0.1') {
	
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
		const recipe = {};

		recipe.title = window.location.href;

		sendResponse(recipe);
	}

});