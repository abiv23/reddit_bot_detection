const fs = require('fs');
const path = require('path');

// Configuration
const inputFile = path.join(__dirname, '../comment-json/reddit_comments.json'); // Input path
const outputFile = path.join(__dirname, '../humanComments.js'); // Output as humanComments.js
const outputVarName = 'humanComments'; // Name of the exported const

// Read the Reddit JSON file
fs.readFile(inputFile, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading input file:', err);
    process.exit(1);
  }

  try {
    // Parse the JSON
    const redditData = JSON.parse(data);

    // Validate the structure
    if (redditData.kind !== 'Listing' || !redditData.data || !Array.isArray(redditData.data.children)) {
      console.error('Invalid Reddit JSON format: Expected a Listing with data.children array');
      process.exit(1);
    }

    // Extract the "body" field from each "t1" comment
    const bodies = redditData.data.children
      .filter(child => child.kind === 't1')
      .map(child => child.data.body);

    // Construct the JavaScript content
    const outputContent = `const ${outputVarName} = ${JSON.stringify(bodies, null, 2)};\n\nmodule.exports = ${outputVarName};`;

    // Write to the output file
    fs.writeFile(outputFile, outputContent, 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing output file:', writeErr);
        process.exit(1);
      }
      console.log(`Successfully converted ${bodies.length} comments to ${outputFile}`);
    });
  } catch (parseErr) {
    console.error('Error parsing JSON:', parseErr);
    process.exit(1);
  }
});