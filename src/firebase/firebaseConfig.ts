import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQ-eIZBnmf-U8Ipl97ejp4C36viL4eIks",
  authDomain: "pediatritrackglobal.firebaseapp.com",
  projectId: "pediatritrackglobal",
  storageBucket: "pediatritrackglobal.firebasestorage.app",
  messagingSenderId: "211165366921",
  appId: "1:211165366921:web:8b1a932d5b88be81c91458",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;