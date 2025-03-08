// Function to analyze comments on the page
function analyzeComments() {
  const comments = document.querySelectorAll('.comment .usertext-body');
  comments.forEach(comment => {
    const text = comment.textContent.trim();
    if (text.length > 50) { // Skip very short comments
      const detectionResult = detectAIComment(text);
      if (detectionResult.isAI) {
        comment.style.border = '2px solid red';
        comment.style.position = 'relative'; // For tooltip positioning
        addTooltip(comment, `AI Detected (Confidence: ${detectionResult.confidence}%)`);
      }
    }
  });
}

// Heuristic-based AI detection function
function detectAIComment(text) {
  let score = 0;

  // 1. Word count and sentence length (AI often writes longer, polished responses)
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;
  const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / wordCount;
  if (wordCount > 20 && avgWordLength > 5) score += 20; // Long, verbose text

  // 2. Repetition of phrases (AI can repeat itself)
  const lowerText = text.toLowerCase();
  const phraseRe = /(.{10,})\1/; // Repeated sequences of 10+ chars
  if (phraseRe.test(lowerText)) score += 30;

  // 3. Overly formal or polished tone (uncommon in casual Reddit comments)
  const formalMarkers = [
    'furthermore', 'moreover', 'therefore', 'in conclusion', 'additionally',
    'it is worth noting', 'as previously mentioned', 'in my opinion'
  ];
  const formalCount = formalMarkers.reduce((count, marker) => 
    count + (lowerText.includes(marker) ? 1 : 0), 0);
  if (formalCount > 1) score += 20;

  // 4. Lack of slang or casual tone (Cavs fans might say "Cavs," "LeBron," "LFG")
  const cavsSlang = ['cavs', 'lebron', 'darius', 'donovan', 'lfg', 'go cavs', 'cleveland', 'w'];
  const hasSlang = cavsSlang.some(slang => lowerText.includes(slang));
  if (!hasSlang && wordCount > 15) score += 15;

  // 5. Perfect grammar indicators (AI avoids fragments, contractions less common)
  const contractionCount = (text.match(/n't|'s|'re|'ve|'d|'ll/g) || []).length;
  if (contractionCount === 0 && wordCount > 10) score += 15;

  // 6. Generic or off-topic vibes (AI might miss Cavs-specific context)
  const basketballTerms = ['game', 'shot', 'dunk', 'rebound', 'assist', 'score', 'team'];
  const hasContext = basketballTerms.some(term => lowerText.includes(term));
  if (!hasContext && wordCount > 20) score += 20;

  // Calculate confidence (0-100%)
  const confidence = Math.min(95, score); // Cap at 95% since it’s heuristic
  return { isAI: confidence > 50, confidence };
}

// Add a tooltip to flagged comments
function addTooltip(comment, message) {
  const tooltip = document.createElement('span');
  tooltip.textContent = message;
  tooltip.style.position = 'absolute';
  tooltip.style.background = '#333';
  tooltip.style.color = '#fff';
  tooltip.style.padding = '2px 5px';
  tooltip.style.borderRadius = '3px';
  tooltip.style.fontSize = '12px';
  tooltip.style.top = '-20px';
  tooltip.style.left = '0';
  tooltip.style.zIndex = '1000';
  comment.appendChild(tooltip);
}

// Run on load and observe for new comments
analyzeComments();
new MutationObserver(analyzeComments).observe(document.body, { childList: true, subtree: true });