require('dotenv').config();
const fetch = require('node-fetch');

// Configuration
const subreddit = 'clevelandcavs';
const postIds = ['1j67dkb', '1j67hnl', '1j681lu', '1j6hank']; // Example post IDs (adjust as needed)
const clientId = process.env.REDDIT_CLIENT_ID;
const clientSecret = process.env.REDDIT_CLIENT_SECRET;
const username = process.env.REDDIT_USERNAME;
const password = process.env.REDDIT_PASSWORD;
const userAgent = 'CavsAICommentDetector/1.0 (by /u/yourusername)';
const outputFile = '../brain/humanComments.js';

// OAuth2 token function
async function getAccessToken() {
  const response = await fetch('https://www.reddit.com/api/v1/access_token', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=password&username=${username}&password=${password}`,
  });
  const data = await response.json();
  return data.access_token;
}

// Fetch comments from a post
async function fetchComments(postId, accessToken) {
  let allComments = [];
  let after = null;

  do {
    const url = `https://oauth.reddit.com/r/${subreddit}/comments/${postId}.json?limit=100${after ? `&after=${after}` : ''}`;
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'User-Agent': userAgent,
      },
    });
    const data = await response.json();

    // Extract comments from the second listing (first is the post)
    const comments = data[1].data.children
      .filter(child => child.kind === 't1')
      .map(child => child.data.body);

    allComments = allComments.concat(comments);

    // Handle "more" comments
    const moreComments = data[1].data.children.filter(child => child.kind === 'more');
    for (const more of moreComments) {
      const moreUrl = `https://oauth.reddit.com/api/morechildren?link_id=t3_${postId}&children=${more.data.children.join(',')}&api_type=json`;
      const moreResponse = await fetch(moreUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'User-Agent': userAgent,
        },
      });
      const moreData = await moreResponse.json();
      const moreBodies = moreData.json.data.things
        .filter(thing => thing.kind === 't1')
        .map(thing => thing.data.body);
      allComments = allComments.concat(moreBodies);
    }

    after = data[1].data.after;
    await new Promise(resolve => setTimeout(resolve, 1000)); // Respect rate limit
  } while (after);

  return allComments;
}

// Main execution
async function main() {
  const accessToken = await getAccessToken();
  let allComments = [];

  for (const postId of postIds) {
    const comments = await fetchComments(postId, accessToken);
    allComments = allComments.concat(comments);
    console.log(`Fetched ${comments.length} comments from post ${postId}`);
  }

  // Write to humanComments.js
  const outputContent = `const humanComments = ${JSON.stringify(allComments, null, 2)};\n\nmodule.exports = humanComments;`;
  fs.writeFileSync(outputFile, outputContent, 'utf8');
  console.log(`Successfully wrote ${allComments.length} comments to ${outputFile}`);
}

main().catch(err => console.error('Error:', err));