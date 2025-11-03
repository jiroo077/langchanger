let originalUrls = {};  // to remember the real page URL for each tab

document.getElementById("changeBtn").addEventListener("click", async () => {
  let lang = document.getElementById("language").value;

  // Get the active tab
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  // If it's the first time, save the original URL
  if (!originalUrls[tab.id]) {
    originalUrls[tab.id] = tab.url;
  }

  // Always translate from the saved original URL
  let translateUrl = `https://translate.google.com/translate?sl=auto&tl=${lang}&u=${encodeURIComponent(originalUrls[tab.id])}`;

  chrome.tabs.update(tab.id, { url: translateUrl });
});
