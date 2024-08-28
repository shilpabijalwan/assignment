
import { initializeApp  } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBKWwVbe_-yjjL_EpZC3U4UOq5xz2GR5Hk",
    authDomain: "blogapp-d88a3.firebaseapp.com",
    databaseURL: "https://blogapp-d88a3-default-rtdb.firebaseio.com",
    projectId: "blogapp-d88a3",
    storageBucket: "blogapp-d88a3.appspot.com",
    messagingSenderId: "1027237093439",
    appId: "1:1027237093439:web:d5fcdcdea32a67a711d88a",
    measurementId: "G-58XYQRV5Z4",
    databaseURL:"https://console.firebase.google.com/project/blogapp-d88a3/database/blogapp-d88a3-default-rtdb/data/~2F"
  };
  
  // Initialize Firebase

  export const app = initializeApp(firebaseConfig);

 export const firestore = getFirestore(app);

 export const auth = getAuth(app);
//   export const analytics = getAnalytics(app);