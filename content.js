chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getLinks") {
    // Only target anchor tags with http/https href attributes directly
    const anchorTags = document.querySelectorAll(
      'a[href^="http://"], a[href^="https://"]',
    );
    const uniqueUrls = new Set();

    Array.from(anchorTags).forEach((anchor) => {
      // CHecking visibility and opacity
      if (
        !anchor.checkVisibility({
          checkOpacity: true,
          checkVisibilityProperty: true,
        })
      ) {
        return;
      }
      // filtering out hidden 0x0 trackers/SEO spa)
      const rect = anchor.getBoundingClientRect();
      if (rect.width <= 1 || rect.height <= 1) return;

      // taking care of URL cleaning and deduplication
      try {
        const urlObj = new URL(anchor.href);
        urlObj.hash = ""; // Clearing hash to avoid duplicate URLs  
        const cleanUrl = urlObj.toString();
        if (!uniqueUrls.has(cleanUrl)) {
          uniqueUrls.add(cleanUrl);
        }
      } catch (e) {
        // Skip invalid URLs
      }
    });

    const links = Array.from(uniqueUrls);
    console.log(links);

    sendResponse({ links: links });
  }
});

