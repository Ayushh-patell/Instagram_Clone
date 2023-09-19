import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBFf5PF_wAPtA8Tf8XrRn0CsSWnm7JKKwo",

  authDomain: "instagram-clone-d86d6.firebaseapp.com",

  projectId: "instagram-clone-d86d6",

  storageBucket: "instagram-clone-d86d6.appspot.com",

  messagingSenderId: "906190505623",

  appId: "1:906190505623:web:4e0ba1f109eb44c2dbcbd2",
};

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const db = getFirestore()
const colref = collection(db, "users")

export {firebase, db, colref, query, where, getDocs}