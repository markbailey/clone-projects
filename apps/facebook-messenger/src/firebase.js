import 'firebase/firestore';
import 'firebase/auth';

import firebase from 'firebase/app';

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "facebook-messenger-clone-6e53d.firebaseapp.com",
  databaseURL: "https://facebook-messenger-clone-6e53d.firebaseio.com",
  projectId: "facebook-messenger-clone-6e53d",
  storageBucket: "facebook-messenger-clone-6e53d.appspot.com",
  messagingSenderId: "266262544878",
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-05XRVV321M"
})

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const documentRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await documentRef.get();

  if (!snapShot.exists) {
    const {
      displayName,
      email
    } = userAuth;
    const createdAt = new Date();

    try {
      await documentRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (ex) {
      console.log('Error creating user!', ex);
    }
  }

  return documentRef;
};

export const getCurrentUser = () => {
  let cancelled, cancel, timeout;
  const promise = new Promise((resolve, reject) => {
    cancel = () => {
      cancelled = true;
      reject({
        reason: 'cancelled'
      })
    }

    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      clearTimeout(timeout);
      unsubscribe();
      if (!cancelled) resolve(userAuth);
    }, reject);
  });

  timeout = setTimeout(cancel, 6000);
  return promise;
};


export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleSignInProvider = new firebase.auth.GoogleAuthProvider();
googleSignInProvider.setCustomParameters({
  prompt: 'select_account'
});

export default firebase;
