import { useEffect, useState } from 'react';

function Popup() {
  const [url, setUrl] = useState('');
  const [isMalicious, setIsMalicious] = useState(false);

  useEffect(() => {
    // Query the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const currentUrl = tabs[0]?.url || '';
      setUrl(currentUrl);

      // Example: Check against a simple list
      const maliciousList = ['https://bad.com', 'http://phishing.site'];
      if (maliciousList.includes(currentUrl)) {
        setIsMalicious(true);
      }
    });
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Safe Browsing</h2>
      <p>Current Site: {url}</p>
      {isMalicious ? (
        <p style={{ color: 'red' }}>⚠️ This site is potentially malicious!</p>
      ) : (
        <p style={{ color: 'green' }}>✅ This site looks safe.</p>
      )}
    </div>
  );
}

export default Popup;
