// checking if the check source button is clicked
document.getElementById("checkSourceButton").onclick = function () {
  // finding result div to display
  var result = document.getElementById("result");
  // using chrome api to get current tab and send msg to content.js
  chrome.tabs.query(
    // getting active tab
    { active: true, currentWindow: true },
    function (tabs) {
      var tab = tabs[0];
      var url = tab.url;
      console.log("Current tab URL:", url);
   //   var report = report(url, response.links);

      // sending message to content.js to get links for that tab
      chrome.tabs.sendMessage(
        tab.id,
        { action: "getLinks" },
        function (response) {
          if (chrome.runtime.lastError || !response) {
            result.textContent = "Error: Refresh the page and try again.";
            return;
          }
          // displaying the links in the popup
          result.textContent = JSON.stringify(response.links, null, 2);
        },
      );
    },
  );
};
