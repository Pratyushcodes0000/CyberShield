// Listen for tab updates
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.url) {
    checkUrlSafety(tab.url, tabId);
  }
});

// Function to check URL safety using Google Safe Browsing API
async function checkUrlSafety(url, tabId) {
  const apikey = 'AIzaSyAOAGIU-o7oNWs3qH50kAB-9J_oFdrj2GM';
  const apiUrl = 'https://safebrowsing.googleapis.com/v4/threatMatches:find';
  
  try {
    const response = await fetch(`${apiUrl}?key=${apikey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client: {
          clientId: 'safe-browser-extension',
          clientVersion: '1.0.0'
        },
        threatInfo: {
          threatTypes: ['MALWARE', 'SOCIAL_ENGINEERING', 'UNWANTED_SOFTWARE', 'POTENTIALLY_HARMFUL_APPLICATION'],
          platformTypes: ['ANY_PLATFORM'],
          threatEntryTypes: ['URL'],
          threatEntries: [{ url: url }]
        }
      })
    });

    const data = await response.json();
    const isSafe = !data.matches;
    
    // Update extension icon based on safety
    updateExtensionIcon(isSafe);
    
    // Send message to content script
    chrome.tabs.sendMessage(tabId, {
      action: 'updateSafety',
      isSafe: isSafe,
      threatType: data.matches ? data.matches[0].threatType : null
    });
  } catch (error) {
    console.error('Error checking URL safety:', error);
    // Default to safe if there's an error
    updateExtensionIcon(true);
  }
}

// Function to update extension icon
function updateExtensionIcon(isSafe) {
  const iconPath = isSafe ? {
    16: 'icon16.png',
    32: 'icon32.png',
    48: 'icon48.png',
    128: 'icon128.png'
  } : {
    16: 'icon16.png',
    32: 'icon32.png',
    48: 'icon48.png',
    128: 'icon128.png'
  };
  
  chrome.action.setIcon({ path: iconPath });
}
