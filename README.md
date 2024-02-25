# Dating app

- From registeration you can register yourself
- Login and give your name and bio and maybe some picture of you
- Like and dislike other users also by swiping
- If both have liked each other you can chat with each other
- In profile you can change you email, password and bio/info
- Click other peoples name in chat or in the likeing phase to see their profile

## Technology choises

I decided to use Express for backend, React for frontend and MongoDB for database as those are
the ones that has been used in the course and I have become familiar with them. I coded with Visual Studio Code.

### Dependencies
#### Testing
- cypress
- cypress-localstorage-commands

#### Frontend
- bootstrap
- react-router-dom
- react-swipeable

#### Backend
- bcrypt
- cors
- dotenv
- jsonwebtoken
- mongoose
- multer
- passport
- passport-jwt

## Installation guidelines

1. Download code and unzip it or clone the repository
2. Import database data (testdb.chats , .publics and .users) to mongodb
3. Go to main folder and write `npm install`
4. In the main folder start server and client with `npm run dev:server` and `npm run dev:client`
   in different terminals
6. Starting the client should start the client in browser

## User manual
1. Go to site `http://localhost:3000/login` to start using the application
2. For the passwords it is the same as the starting part of the email (name: __aa__@aa -> password: aa)
3. For tests write in main terminal `./node_modules/.bin/cypress open`

## Features implemented

Feature |	Points
--- | ---
Basic features with well written documentation	| 25
Utilization of a frontside framework, such as React	| 5
One can swipe to left or right to dislike or like the profile	| 2
Use of a pager when there is more than 10 chats available available	| 2
Admin account with rights to edit all the users and comments and delete content/users | 3
User profiles can have images which are shown on the main page and in the chat | 3
User can click username and see user profile page where name, register date, (user picture) and user bio is listed	| 2
Create tests and automate some testing (10 cases) |	5
Password is hashed and salted when saved to database | 1
Total |	48
---
