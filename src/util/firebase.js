import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB6tB1n-3wkC555mYn6ztz43QsjGUzJQ_s",
  authDomain: "learnify-4e003.firebaseapp.com",
  projectId: "learnify-4e003",
  storageBucket: "learnify-4e003.appspot.com",
  messagingSenderId: "507697672048",
  appId: "1:507697672048:web:ba16f4c70dca76cb18e9b5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
