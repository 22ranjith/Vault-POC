document.addEventListener("DOMContentLoaded", function() {
    var checkPageButton = document.getElementById('checkPage');
    checkPageButton.addEventListener('click', function() {
      var newURL = "http://3.139.138.221:8080/jenkins/";
      chrome.tabs.create({ url: newURL,active:false }, function(tab){
          console.log('Attempting to inject script into tab:',tab);
          chrome.scripting.executeScript({
            target: {tabId: tab.id},
            files: ["./contentscript.js"],
        });
        // chrome.tabs.executeScript(tab.id, { code: "document.documentElement.outerHTML;" }, function(result) {
        //     var newTabDOM = result[0];
        //     console.log(newTabDOM); // Print the DOM element to the console
        //   });
      });
  
    }, false);
  }, false);

