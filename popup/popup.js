// checking if the check source button is clicked
document.getElementById("checkSourceButton").onclick = function () {
  // finding result div to display
  var result = document.getElementById("result");
  result.textContent = "Analyzing...";

  // using chrome api to get current tab and send msg to content.js
  chrome.tabs.query(
    // getting active tab
    { active: true, currentWindow: true },
    function (tabs) {
      var tab = tabs[0];
      var url = tab.url;
      console.log("Current tab URL:", url);

      // sending message to content.js to get links for that tab
      chrome.tabs.sendMessage(
        tab.id,
        { action: "getLinks" },
        function (response) {
          if (chrome.runtime.lastError || !response) {
            result.textContent = "Error: Refresh the page and try again.";
            return;
          }
          
          const page = response.page;
          const pageSummary = "Current Page Summary:\n" +
            "Title: " + page.title + "\n" +
            "Domain: " + page.analysis.domain + "\n" +
            "Protocol: " + page.analysis.protocol + "\n" +
            "Is HTTPS: " + page.analysis.isHttps + "\n" +
            "Subdomain: " + page.analysis.subdomain + "\n" +
            "Root Domain: " + page.analysis.rootDomain + "\n\n" +
            "Extracted Links:\n";

          // displaying both the summary and the links in the popup
          result.textContent = pageSummary + JSON.stringify(response.links, null, 2);
        },
      );
    },
  );
};