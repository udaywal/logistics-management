import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBAP0KEwU3wGPzzzISAWGpMgI0sLVZg19A",
    authDomain: "syook-logistics.firebaseapp.com",
    projectId: "syook-logistics",
    storageBucket: "syook-logistics.appspot.com",
    messagingSenderId: "15845273751",
    appId: "1:15845273751:web:71cd755ac0299ecc4d79d2"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default db;