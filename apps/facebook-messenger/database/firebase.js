require('dotenv').config();
require('firebase/firestore');
require('firebase/auth');

const firebase = require('firebase/app');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "facebook-messenger-clone-6e53d.firebaseapp.com",
  databaseURL: "https://facebook-messenger-clone-6e53d.firebaseio.com",
  projectId: "facebook-messenger-clone-6e53d",
  storageBucket: "facebook-messenger-clone-6e53d.appspot.com",
  messagingSenderId: "266262544878",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-05XRVV321M"
});

const app = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://facebook-messenger-clone-6e53d.firebaseio.com'
});

exports.auth = firebase.auth();
exports.firestore = firebase.firestore();
exports.admin = app;

exports.default = firebase;
