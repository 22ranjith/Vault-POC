
self.importScripts('defaults.js', 'utils.js');
self.importScripts('fill.js');

// inject
chrome.runtime.onMessage.addListener((request, sender, response) => {
  // from content script
  if (request.cmd === 'get-url') {
    response(sender.tab.url);
  }
});