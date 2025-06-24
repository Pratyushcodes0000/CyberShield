// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'checkSafety') {
    checkUrlSafety(window.location.href).then(isSafe => {
      sendResponse({ isSafe });
    });
    return true; // Required for async response
  }
});

// Function to check URL safety using Google Safe Browsing API
const checkUrlSafety = async (url) => {
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
    
    // If there are matches, the URL is unsafe
    const isSafe = !data.matches;
    
    if (!isSafe) {
      showWarningBanner(data.matches[0].threatType);
      showSafetyPopup(data.matches[0]);
    }
    
    return isSafe;
  } catch (error) {
    console.error('Error checking URL safety:', error);
    return true; // Default to safe if there's an error
  }
};

// Function to show warning banner
function showWarningBanner(threatType) {
  const banner = document.createElement('div');
  banner.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to right, #ff4444, #ff6b6b);
    color: white;
    padding: 12px 20px;
    text-align: center;
    z-index: 999999;
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(10px);
  `;
  
  const threatTypeMap = {
    'MALWARE': 'Malware',
    'SOCIAL_ENGINEERING': 'Phishing',
    'UNWANTED_SOFTWARE': 'Unwanted Software',
    'POTENTIALLY_HARMFUL_APPLICATION': 'Potentially Harmful Application'
  };
  
  const threatName = threatTypeMap[threatType] || threatType;
  
  banner.innerHTML = `
    <div style="display: flex; justify-content: space-between; align-items: center; max-width: 1200px; width: 100%;">
      <div style="display: flex; align-items: center; gap: 10px;">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" stroke-width="2"/>
          <path d="M12 8V12" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <circle cx="12" cy="16" r="1" fill="white"/>
        </svg>
        <span style="font-weight: 500;">Warning: This website may contain ${threatName}</span>
      </div>
      <button onclick="this.parentElement.parentElement.remove()" style="
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 20px;
        padding: 0 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: opacity 0.2s;
      " onmouseover="this.style.opacity='0.7'" onmouseout="this.style.opacity='1'">×</button>
    </div>
  `;
  
  document.body.appendChild(banner);
}

// Function to show safety popup
function showSafetyPopup(threatInfo) {
  // Create overlay
  const overlay = document.createElement('div');
  overlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000000;
    backdrop-filter: blur(5px);
  `;

  // Create popup
  const popup = document.createElement('div');
  popup.style.cssText = `
    background-color: white;
    padding: 24px;
    border-radius: 12px;
    max-width: 420px;
    width: 90%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
    animation: popupFadeIn 0.3s ease-out;
  `;

  // Add animation keyframes
  const style = document.createElement('style');
  style.textContent = `
    @keyframes popupFadeIn {
      from { opacity: 0; transform: scale(0.95); }
      to { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);

  const threatTypeMap = {
    'MALWARE': 'Malware',
    'SOCIAL_ENGINEERING': 'Phishing',
    'UNWANTED_SOFTWARE': 'Unwanted Software',
    'POTENTIALLY_HARMFUL_APPLICATION': 'Potentially Harmful Application'
  };

  const threatName = threatTypeMap[threatInfo.threatType] || threatInfo.threatType;

  popup.innerHTML = `
    <div style="text-align: center; margin-bottom: 24px;">
      <div style="
        width: 64px;
        height: 64px;
        background: linear-gradient(135deg, #ff4444, #ff6b6b);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 16px;
      ">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" stroke-width="2"/>
          <path d="M12 8V12" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <circle cx="12" cy="16" r="1" fill="white"/>
        </svg>
      </div>
      <div style="color: #ff4444; font-size: 24px; font-weight: 600; margin-bottom: 8px;">Warning!</div>
      <div style="font-size: 18px; font-weight: 500; margin-bottom: 8px; color: #333;">This website may be unsafe</div>
      <div style="color: #666; margin-bottom: 16px;">We've detected potential ${threatName} on this website.</div>
    </div>
    <div style="
      background-color: #f8f9fa;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 24px;
      border: 1px solid #e9ecef;
    ">
      <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#666" stroke-width="2"/>
          <path d="M12 8V12" stroke="#666" stroke-width="2" stroke-linecap="round"/>
          <circle cx="12" cy="16" r="1" fill="#666"/>
        </svg>
        <strong style="color: #333;">Threat Type:</strong>
        <span style="color: #666;">${threatInfo.threatType}</span>
      </div>
      <div style="margin-bottom: 12px; display: flex; align-items: center; gap: 8px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#666" stroke-width="2"/>
          <path d="M12 8V12" stroke="#666" stroke-width="2" stroke-linecap="round"/>
          <circle cx="12" cy="16" r="1" fill="#666"/>
        </svg>
        <strong style="color: #333;">Platform:</strong>
        <span style="color: #666;">${threatInfo.platformType}</span>
      </div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#666" stroke-width="2"/>
          <path d="M12 8V12" stroke="#666" stroke-width="2" stroke-linecap="round"/>
          <circle cx="12" cy="16" r="1" fill="#666"/>
        </svg>
        <strong style="color: #333;">URL:</strong>
        <span style="color: #666; word-break: break-all;">${window.location.href}</span>
      </div>
    </div>
    <div style="display: flex; gap: 12px;">
      <button id="leave-site" style="
        background: linear-gradient(135deg, #ff4444, #ff6b6b);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        flex: 1;
        transition: transform 0.2s, box-shadow 0.2s;
        box-shadow: 0 2px 8px rgba(255, 68, 68, 0.3);
      " onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 4px 12px rgba(255, 68, 68, 0.4)'" 
         onmouseout="this.style.transform='translateY(0)';this.style.boxShadow='0 2px 8px rgba(255, 68, 68, 0.3)'">Leave Site</button>
      <button id="proceed-anyway" style="
        background: #f8f9fa;
        color: #333;
        border: 1px solid #e9ecef;
        padding: 12px 24px;
        border-radius: 8px;
        cursor: pointer;
        font-weight: 500;
        flex: 1;
        transition: background-color 0.2s;
      " onmouseover="this.style.backgroundColor='#e9ecef'" 
         onmouseout="this.style.backgroundColor='#f8f9fa'">Proceed Anyway</button>
    </div>
  `;

  // Add event listeners
  popup.querySelector('#leave-site').addEventListener('click', () => {
    window.history.back();
    overlay.remove();
  });

  popup.querySelector('#proceed-anyway').addEventListener('click', () => {
    overlay.remove();
  });

  overlay.appendChild(popup);
  document.body.appendChild(overlay);
}

// Check URL safety when page loads
checkUrlSafety(window.location.href);
