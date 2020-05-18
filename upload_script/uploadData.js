// In your index.js
 
const firestoreService = require('firestore-export-import');
const serviceAccount = require('./serviceAccountKey.json');
 
// Initiate Firebase App
// appName is optional, you can obmit it.
const databaseURL = 'https://fir-cookbook-49f2a.firebaseio.com';
firestoreService.initializeApp(serviceAccount, databaseURL);
 
// Start importing your data
// The array of date, location and reference fields are optional
firestoreService.restore('data.json');