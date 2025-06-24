// Create context menu item
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "checkFakeNews",
    title: "Check Fake News",
    contexts: ["selection"]
  });
});

// Simple fake news detection logic
function detectFakeNews(text) {
  // This is a simple implementation that could be enhanced with more sophisticated detection
  const suspiciousPhrases = [
    'shocking', 'unbelievable', 'you won\'t believe', 'mind-blowing',
    'never before seen', 'exclusive', 'secret', 'conspiracy',
    'they don\'t want you to know', 'hidden truth'
  ];
  
  const textLower = text.toLowerCase();
  let suspiciousCount = 0;
  
  // Check for suspicious phrases
  suspiciousPhrases.forEach(phrase => {
    if (textLower.includes(phrase)) {
      suspiciousCount++;
    }
  });
  
  // Check for excessive punctuation
  const exclamationCount = (textLower.match(/!/g) || []).length;
  const questionCount = (textLower.match(/\?/g) || []).length;
  
  // Calculate score based on various factors
  const score = Math.min(1, (
    (suspiciousCount * 0.2) + // Each suspicious phrase adds 0.2 to the score
    (exclamationCount * 0.1) + // Each exclamation mark adds 0.1
    (questionCount * 0.05) // Each question mark adds 0.05
  ));
  
  return {
    score: score,
    verdict: score > 0.7 ? "Likely Fake" : 
             score > 0.4 ? "Uncertain" : "Likely True",
    facts: generateFacts(text, score, suspiciousCount, exclamationCount)
  };
}

function generateFacts(text, score, suspiciousCount, exclamationCount) {
  const facts = [];
  
  if (suspiciousCount > 0) {
    facts.push(`Contains ${suspiciousCount} suspicious phrases commonly found in fake news`);
  }
  
  if (exclamationCount > 3) {
    facts.push(`Uses excessive exclamation marks (${exclamationCount}), which is a common trait in sensationalized content`);
  }
  
  if (score > 0.7) {
    facts.push("The language used is highly sensationalized and may be misleading");
    facts.push("Consider verifying this information with reliable news sources");
  } else if (score > 0.4) {
    facts.push("Some elements of the text raise concerns about its reliability");
    facts.push("Cross-reference this information with other sources");
  } else {
    facts.push("The text appears to use relatively neutral language");
    facts.push("However, it's always good to verify information from multiple sources");
  }
  
  return facts;
}

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "checkFakeNews") {
    const selectedText = info.selectionText;
    
    // Send message to content script
    chrome.tabs.sendMessage(tab.id, {
      action: "checkFakeNews",
      text: selectedText
    });
  }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "analyzeText") {
    const result = detectFakeNews(request.text);
    sendResponse(result);
  }
  return true; // Required for async response
});
