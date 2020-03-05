import firebase from 'firebase';
import 'firebase/firestore';

firebase.initializeApp({
  apiKey: process.env["REACT_APP_FIREBASE_API_KEY"],
  authDomain: '### FIREBASE AUTH DOMAIN ###',
  projectId: process.env["REACT_APP_FIREBASE_PROJECT_ID"]
});
  
const fireStoreDb = firebase.firestore();

export {fireStoreDb};