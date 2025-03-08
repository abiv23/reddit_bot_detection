const fs = require('fs');

// Function to generate SVG
function generateSVG(size) {
  return `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- Basketball (orange circle with black lines) -->
  <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 2}" fill="#f28c38" stroke="#000" stroke-width="2"/>
  <path d="M${size/4},${size/4} Q${size/2},${size/2} ${size*3/4},${size/4}" stroke="#000" stroke-width="2" fill="none"/>
  <path d="M${size/4},${size*3/4} Q${size/2},${size/2} ${size*3/4},${size*3/4}" stroke="#000" stroke-width="2" fill="none"/>
  <line x1="${size/2}" y1="0" x2="${size/2}" y2="${size}" stroke="#000" stroke-width="2"/>
  <!-- Red Bullseye -->
  <circle cx="${size/2}" cy="${size/2}" r="${size/4}" fill="red"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size/8}" fill="white"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size/16}" fill="red"/>
</svg>`;
}

// Write SVG files
fs.writeFileSync('icon48.svg', generateSVG(48));
fs.writeFileSync('icon128.svg', generateSVG(128));
console.log('Icons generated as SVG!');