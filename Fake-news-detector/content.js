// Create and inject popup styles
const style = document.createElement('style');
style.textContent = `
  .fake-news-popup {
    position: fixed;
    top: 20px;
    right: 20px;
    background: #23272f;
    color: #f1f1f1;
    padding: 24px 28px 20px 24px;
    border-radius: 14px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    z-index: 10000;
    max-width: 400px;
    font-family: 'Segoe UI', 'Arial', sans-serif;
    border: 1px solid #2c2f36;
    transition: box-shadow 0.2s;
  }
  .fake-news-popup h3 {
    margin: 0 0 10px 0;
    color: #f8fafc;
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: 0.02em;
  }
  .fake-news-popup .verdict {
    font-weight: bold;
    margin: 12px 0 10px 0;
    padding: 7px 14px;
    border-radius: 6px;
    font-size: 1rem;
    background: rgba(40, 167, 69, 0.12);
    color: #00e676;
    border: 1px solid rgba(40, 167, 69, 0.25);
    display: inline-block;
  }
  .fake-news-popup .verdict.likely-fake {
    background: rgba(220, 53, 69, 0.12);
    color: #ff5252;
    border-color: rgba(220, 53, 69, 0.25);
  }
  .fake-news-popup .verdict.uncertain {
    background: rgba(255, 193, 7, 0.12);
    color: #ffd600;
    border-color: rgba(255, 193, 7, 0.25);
  }
  .fake-news-popup .facts {
    margin: 12px 0 0 0;
    padding-left: 18px;
  }
  .fake-news-popup .facts h4 {
    color: #b0b8c1;
    font-size: 1rem;
    margin: 0 0 6px 0;
    font-weight: 500;
  }
  .fake-news-popup .facts li {
    margin: 6px 0;
    color: #e0e0e0;
    font-size: 0.97rem;
  }
  .fake-news-popup .close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    background: #23272f;
    border: 1px solid #444857;
    font-size: 20px;
    color: #b0b8c1;
    border-radius: 50%;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, color 0.2s;
  }
  .fake-news-popup .close-btn:hover {
    background: #2c2f36;
    color: #ff5252;
  }
`;
document.head.appendChild(style);

// Create popup element
function createPopup() {
  const popup = document.createElement('div');
  popup.className = 'fake-news-popup';
  popup.innerHTML = `
    <button class="close-btn">&times;</button>
    <h3>Fake News Analysis</h3>
    <div class="content"></div>
  `;
  return popup;
}

// Show popup with results
function showPopup(results) {
  const popup = createPopup();
  const content = popup.querySelector('.content');
  
  // Set verdict color and class based on score
  let verdictClass = '';
  if (results.score > 0.7) verdictClass = 'likely-fake';
  else if (results.score > 0.4) verdictClass = 'uncertain';
  
  content.innerHTML = `
    <div class="verdict ${verdictClass}">
      Verdict: ${results.verdict}
    </div>
    <div class="facts">
      <h4>Key Facts:</h4>
      <ul>
        ${results.facts.map(fact => `<li>${fact}</li>`).join('')}
      </ul>
    </div>
  `;
  
  // Add close button functionality
  popup.querySelector('.close-btn').addEventListener('click', () => {
    popup.remove();
  });
  
  document.body.appendChild(popup);
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (document.body.contains(popup)) {
      popup.remove();
    }
  }, 10000);
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkFakeNews") {
    // Send message to background script for analysis
    chrome.runtime.sendMessage({
      action: "analyzeText",
      text: request.text
    }, (response) => {
      showPopup(response);
    });
  }
});
