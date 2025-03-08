# CavsAICommentDetector

## Overview
CavsAICommentDetector is a Node.js project designed to detect AI-generated comments in the *r/clevelandcavs* subreddit. It fetches human comments from Reddit, generates AI comments, and prepares a dataset for training a machine learning model to distinguish between them. The project includes scripts for data collection, conversion, and training preparation.

## Project Structure
- *brain/*: Contains the comment datasets and training script.
  - *humanComments.js*: Array of human comment bodies from *r/clevelandcavs*.
  - *aiComments.js*: Array of AI-generated comment bodies.
  - *training.js*: Script for preparing the dataset for ML training.
- *comment-json/*: Stores raw Reddit API responses.
  - *reddit_comments.json*: Initial Reddit comment data.
- *scripts/*: Utility scripts for data processing.
  - *convertRedditJson.js*: Converts Reddit JSON to *humanComments.js*.
  - *convertAiBodiesToComments.js*: Converts AI comment bodies to *aiComments.js*.
  - *fetchRedditComments.js*: Fetches more comments from Reddit API.
- *icons/*: Contains icon assets for the project (e.g., *icon48.png*, *icon128.svg*).

## Prerequisites
- **Node.js**: Ensure Node.js (v20.18.3 or later) is installed. Download from [nodejs.org](https://nodejs.org).
- **Reddit API Access**:
  - Create a Reddit app at [https://www.reddit.com/prefs/apps](https://www.reddit.com/prefs/apps) (type: personal use script).
  - Set the redirect URI to *http://localhost:8080*.
  - Note your *client_id* and *client_secret* from the app settings.
- **Dependencies**:
  - Install required Node.js packages by running the following command in the *scripts* directory:
    cd scripts
    npm install node-fetch dotenv

## Setup

### Environment Variables
Create a *.env* file in the *scripts/* directory with your Reddit API credentials:
REDDIT_CLIENT_ID=your_client_id
REDDIT_CLIENT_SECRET=your_client_secret
REDDIT_USERNAME=your_reddit_username
REDDIT_PASSWORD=your_reddit_password

**Note**: Ensure *.env* is listed in *.gitignore* to prevent exposing credentials.

## Usage

### Fetch Human Comments
Fetch more human comments from *r/clevelandcavs* using the Reddit API:
- Update *postIds* in *scripts/fetchRedditComments.js* with recent post IDs from *r/clevelandcavs* (e.g., ['1j67dkb', '1j67e11']).
- Run the script:
``` bash
  cd scripts
  node fetchRedditComments.js
```
- This updates *brain/humanComments.js* with new comment bodies.

### Generate AI Comments
The *brain/aiComments.js* file already contains 100 AI-generated comments. To regenerate or modify:
- Edit *ai_bodies.json* with new comment bodies.
- Run:
``` bash
  node convertAiBodiesToComments.js
  ```

### Prepare for Training
- The *brain/training.js* script loads *humanComments.js* and *aiComments.js* for training preparation.
- Modify *training.js* to integrate with your preferred ML library (e.g., TensorFlow.js, scikit-learn).
- Run:
``` bash
  cd brain
  node training.js
```

## Dataset Details
- **Human Comments**: *humanComments.js* contains an array of comment bodies from *r/clevelandcavs*.
- **AI Comments**: *aiComments.js* contains 100 AI-generated comment bodies, mimicking *r/clevelandcavs* style.
- **Format**: Both files export simple JavaScript arrays of strings (e.g., ["comment1", "comment2", ...]).

## Contributing
Contributions are welcome! To contribute:
- Fork the repository.
- Create a new branch (git checkout -b feature-branch).
- Make your changes and commit (git commit -m "Add feature").
- Push to your fork (git push origin feature-branch).
- Open a pull request.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
- Thanks to the *r/clevelandcavs* community for the comment data.