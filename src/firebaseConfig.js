import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAyiRb-cGq3JeYadH9o5wdBc7IB3Sptxq0",
  authDomain: "bestdeal-2.firebaseapp.com",
  projectId: "bestdeal-2",
  storageBucket: "bestdeal-2.appspot.com",
  messagingSenderId: "1092205818367",
  appId: "1:1092205818367:web:8b271c8e98197ebef7f7ca"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }