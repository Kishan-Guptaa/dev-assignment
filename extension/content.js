// Content Script listening to Popup scan request messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "GET_DOM_TEXT") {
    try {
      // Fetch readable inner text from body container
      const bodyText = document.body ? document.body.innerText : "";
      sendResponse({ text: bodyText.substring(0, 15000) });
    } catch (e) {
      console.error("DOM text extraction failed:", e);
      sendResponse({ text: "" });
    }
  }
  return true; // Keep message channel open for asynchronous responses
});
