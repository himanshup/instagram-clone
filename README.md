# Instagram Clone

[![Build Status](https://www.travis-ci.org/himanshup/instagram-clone.svg?branch=master)](https://www.travis-ci.org/himanshup/instagram-clone)

![Image 1](https://raw.githubusercontent.com/himanshup/instagram-clone/master/screenshots/image1.png)  
Instagram clone built with React, Redux, Node.js, Express, Passport.js & MongoDB.

## Features

- Sign up for an account and edit avatar/bio/name later on.
- Upload images with captions and option to edit/delete them.
- Comment on posts and option to edit/delete them.
- Like/unlike posts.
- Follow/unfollow users.
- Feed consists of posts from users you follow and the 'Explore' page has posts from every user.

## Features to add

- Demo login button (for people who don't want to register).
- Add location to posts.
- Add tags to posts.
- Search option for tags and location.
- Bookmark posts.
- Modals that display likes (on a post), and followers/following (on profile).

## Development

To get this working on your machine, you will need to install MongoDB and export a database url as an env variable (`export DATABASEURL='<url>`). You also need to create a cloudinary account and export the api key and api secret as env variables.

```
git clone https://github.com/himanshup/instagram-clone.git
cd instagram-clone
npm install
cd client
npm install
cd..
npm run dev
```

## Tests

```
npm test
```
