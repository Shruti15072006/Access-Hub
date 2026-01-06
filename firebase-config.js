// firebase/firebase-config.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDlyIu4Q8WocrAMk4_YUozFOIUw3Bop6oA",
  authDomain:  "accesshub-becd0.firebaseapp.com",
  projectId:  "accesshub-becd0",
  storageBucket: "accesshub-becd0.firebasestorage.app",
  messagingSenderId:  "914715916664",
  appId: "1:914715916664:web:b15dc73c2b6d8e1fd1b08d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
