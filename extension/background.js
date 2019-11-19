let idToTrack;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.category === 'track') {
    idToTrack = message.popupOpenedTab;
    console.log('idToTrack', idToTrack);
  }

  if (message.category === 'saveStorage') {
    chrome.storage.local.set({ recipeStorage: message.recipeStorage });
    chrome.storage.local.get('recipeStorage', storage => {
      console.log('storage set!', storage);
    });
  }

});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

  // If the tab that was refreshed was the same as the ID we're tracking then let popup know to clear storage
  if (tabId === idToTrack) {
    console.log('Page was refreshed');

    chrome.storage.local.set({ recipeStorage: {} }, function() {
      console.log('recipeStorage cleared!');
    });
  }
});