# CavsAICommentDetector

## Overview
CavsAICommentDetector is a Node.js project designed to detect AI-generated comments in the `r/clevelandcavs` subreddit. It fetches human comments from Reddit, generates AI comments, and prepares a dataset for training a machine learning model to distinguish between them. The project includes scripts for data collection, conversion, and training preparation.

## Project Structure
- **brain/**: Contains the comment datasets and training script.
  - `humanComments.js`: Array of human comment bodies from `r/clevelandcavs`.
  - `aiComments.js`: Array of AI-generated comment bodies.
  - `training.js`: Script for preparing the dataset for ML training.
- **comment-json/**: Stores raw Reddit API responses.
  - `reddit_comments.json`: Initial Reddit comment data.
- **scripts/**: Utility scripts for data processing.
  - `convertRedditJson.js`: Converts Reddit JSON to `humanComments.js`.
  - `convertAiBodiesToComments.js`: Converts AI comment bodies to `aiComments.js`.
  - `fetchRedditComments.js`: Fetches more comments from Reddit API.
- **icons/**: Contains icon assets for the project (e.g., `icon48.png`, `icon128.svg`).

## Prerequisites
- **Node.js**: Ensure Node.js (v20.18.3 or later) is installed. Download from [nodejs.org](https://nodejs.org).
- **Reddit API Access**:
  - Create a Reddit app at `https://www.reddit.com/prefs/apps` (type: personal use script).
  - Set the redirect URI to `http://localhost:8080`.
  - Note your `client_id` and `client_secret` from the app settings.
- **Dependencies**:
  - Install required Node.js packages:
    ```bash
    cd scripts
    npm install node-fetch dotenv