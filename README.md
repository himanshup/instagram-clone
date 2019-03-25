# Instagram Clone

[![Build Status](https://www.travis-ci.org/himanshup/instagram-clone.svg?branch=master)](https://www.travis-ci.org/himanshup/instagram-clone)

![Image 1](https://raw.githubusercontent.com/himanshup/instagram-clone/master/screenshots/image1.png)  
Instagram clone built with React, Redux, Node.js, Express, Passport.js & MongoDB.

## Features

- Sign up for an account and edit avatar/bio/name later on
- Upload images with captions and option to edit/delete them
- Comment on posts and option to edit/delete them
- Like/unlike posts
- Follow/unfollow users
- Feed consists of posts from users you follow and the 'Explore' page has posts from every user

## Features to add

- Demo login button (for people who don't want to register)
- Add location to posts
- Add tags to posts
- Search option for tags and location
- Bookmark posts
- Modals that display likes (on a post), and followers/following (on profile)

## Running Locally

The following instruction should get this project running on your machine.  

### Prerequisites
1. Install [MongoDB](https://www.mongodb.com/)  
2. Create a [Cloudinary](https://cloudinary.com/) account (need an API key and secret)

### Installing
```
git clone https://github.com/himanshup/reactgram.git
cd reactgram
npm install
cd client
npm install
cd..
```

Create a .env file in the root of the project and add the following:

```
DATABASEURL='mongodb://localhost:27017/<dbname>'
API_KEY='<key>'
API_SECRET='<secret>'
```

Run `mongod` in another terminal and `npm run dev` in the terminal with the project.

## Tests

```
npm test
```
