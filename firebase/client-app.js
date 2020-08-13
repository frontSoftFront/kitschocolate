import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/firestore'; // If you need it
// import 'firebase/auth'; // If you need it
// import 'firebase/analytics'; // If you need it
// import 'firebase/functions'; // If you need it
// ////a//////////////////////////////////////////////

const clientCredentials = {
  appId: process.env.FIREBASE_APP_ID,
  apiKey: process.env.FIREBASE_API_KEY,
  projectId: process.env.FIREBASE_PROJECT_ID,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

// const firebaseConfig = {
//   apiKey: 'AIzaSyA_JNGWr-TlYsxQxGSILFuhfyyYfYqwmiA',
//   authDomain: 'bookbook-api-v1.firebaseapp.com',
//   databaseURL: 'https://bookbook-api-v1.firebaseio.com',
//   projectId: 'bookbook-api-v1',
//   storageBucket: 'bookbook-api-v1.appspot.com',
//   messagingSenderId: '271861363707',
//   appId: '1:271861363707:web:258548d4895aca4c26915e',
//   measurementId: 'G-NK7SJBYX65',
// };

// Check that `window` is in scope for the analytics module!
if (!firebase.apps.length) {
  firebase.initializeApp(clientCredentials);
  // firebase.storage();firebaseConfig
  firebase.database();
  firebase.firestore(); // If you need it
  // firebase.functions(); // If you need it
}

export default firebase;
