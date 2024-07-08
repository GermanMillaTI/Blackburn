import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'firebase/compat/auth';
import { getAuth } from "firebase/auth";
//import { getStorage, ref, uploadString, getDownloadURL, getBlob, deleteObject, getMetadata } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_FBAPPID
};

const app = firebase.initializeApp(firebaseConfig);

// Init services
const auth = firebase.auth();
const realtimeDb = firebase.database();

export { auth, realtimeDb, getAuth }