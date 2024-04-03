# Timesheet nodejs server
Runs the backend service for the timesheets webapp and connects to Firebase

## Instructions
Create a `.env` file at root directory with the following:
```
NODE_ENV=development
FRONTEND_URL=http://localhost:3000 (or whatever endpoint webapp is on)
PORT=4000
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
```
Firebase credentials can be aquired from Firebase console
Start with `node app.js`
