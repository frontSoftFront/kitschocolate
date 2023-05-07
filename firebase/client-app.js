import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/firestore';
// import 'firebase/auth'; // If you need it
// import 'firebase/analytics'; // If you need it
// import 'firebase/functions'; // If you need it
// //////////////////////////////////////////////////

const clientCredentials = {
  appId: process.env.FIREBASE_APP_ID,
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

// Check that `window` is in scope for the analytics module!
if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
  firebase.storage();
  firebase.database();
  firebase.firestore();
  // firebase.functions(); // If you need it
}

export default firebase;
