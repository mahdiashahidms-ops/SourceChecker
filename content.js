chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getLinks") {
    const anchorTags = document.querySelectorAll("a");
    const links = Array.from(anchorTags)
      .map((anchor) => anchor.href)
      .filter(
        (href) => href.startsWith("http://") || href.startsWith("https://"),
      );
    console.log(links);
    sendResponse({ links: links });
  }
});
