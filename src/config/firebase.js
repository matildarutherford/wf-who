import * as firebase from 'firebase/app';
import 'firebase/database';

const FirebaseConfig = {
  apiKey: 'AIzaSyADwa4-f0qs3ZKeVAFJGm9v1Tn60_eFl9A',
  authDomain: 'baby-face-f2ed1.firebaseapp.com',
  databaseURL: 'https://baby-face-f2ed1.firebaseio.com',
  projectId: 'baby-face-f2ed1',
  storageBucket: 'baby-face-f2ed1.appspot.com',
  messagingSenderId: '507192488721'
};

firebase.initializeApp(FirebaseConfig);

const databaseRef = firebase.database().ref();

export const guessesRef = databaseRef.child('guesses');
