import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBAJr3ooGz31cQh4eiLMdqGaF9GwJ3QBcI',
  authDomain: 'myshopkit-66efe.firebaseapp.com',
  databaseURL: 'https://myshopkit-66efe-default-rtdb.firebaseio.com',
  projectId: 'myshopkit-66efe',
  storageBucket: 'myshopkit-66efe.appspot.com',
  messagingSenderId: '1070248391172',
  appId: '1:1070248391172:web:1288ca7181ab0dbfe1fb51',
  measurementId: 'G-BTE3EGDBKH',
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.database();
