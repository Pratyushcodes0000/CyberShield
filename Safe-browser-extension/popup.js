document.addEventListener('DOMContentLoaded', function() {
  // Get the current tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    const currentTab = tabs[0];
    const url = currentTab.url;
    
    // Display the URL
    document.getElementById('url-display').textContent = url;
    
    // Check if the URL is safe
    checkUrlSafety(url);
  });
});

async function checkUrlSafety(url) {
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
    
    updateUI(isSafe, data.matches ? data.matches[0] : null);
  } catch (error) {
    console.error('Error checking URL safety:', error);
    updateUI(true, null);
  }
}

function updateUI(isSafe, threatInfo) {
  const statusIcon = document.getElementById('status-icon');
  const statusText = document.getElementById('status-text');
  const details = document.getElementById('details');
  
  if (isSafe) {
    statusIcon.className = 'safe';
    statusText.textContent = 'Safe Website';
    details.textContent = 'This website appears to be safe to visit.';
  } else {
    statusIcon.className = 'unsafe';
    statusText.textContent = 'Unsafe Website';
    
    const threatTypeMap = {
      'MALWARE': 'Malware',
      'SOCIAL_ENGINEERING': 'Phishing',
      'UNWANTED_SOFTWARE': 'Unwanted Software',
      'POTENTIALLY_HARMFUL_APPLICATION': 'Potentially Harmful Application'
    };
    
    const threatName = threatTypeMap[threatInfo.threatType] || threatInfo.threatType;
    details.innerHTML = `
      <div style="color: #f44336; font-weight: bold;">Warning!</div>
      <div>This website may contain ${threatName}.</div>
      <div style="margin-top: 10px;">Threat Type: ${threatInfo.threatType}</div>
      <div>Platform: ${threatInfo.platformType}</div>
    `;
  }
}
