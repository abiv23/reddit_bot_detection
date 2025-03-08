const fs = require('fs');

function extractFeatures(text) {
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const lowerText = text.toLowerCase();
  const bigrams = new Set();
  for (let i = 0; i < words.length - 1; i++) bigrams.add(`${words[i]} ${words[i+1]}`);

  return {
    wordCount: words.length,
    avgWordLength: words.reduce((sum, w) => sum + w.length, 0) / words.length,
    slangPresence: /cavs|lfg|dg|lebron|mobley/.test(lowerText) ? 1 : 0,
    formalCount: (lowerText.match(/therefore|moreover|furthermore|in conclusion/gi) || []).length,
    repetitionScore: bigrams.size / (words.length - 1) || 1,
    sentimentConsistency: Math.abs((text.match(/great|good|win/gi) || []).length - 
                                  (text.match(/bad|terrible|loss/gi) || []).length)
  };
}

const data = JSON.parse(fs.readFileSync('data.json', 'utf8'));
const trainingData = data.map(item => ({
  input: extractFeatures(item.text),
  output: { ai: item.label }
}));

fs.writeFileSync('training_data.json', JSON.stringify(trainingData, null, 2));
console.log('Training data prepared!');