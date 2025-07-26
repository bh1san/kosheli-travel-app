// src/lib/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "tourista-ckqlc",
  appId: "1:784309163308:web:ae7dc4e24875a18ced4889",
  storageBucket: "tourista-ckqlc.firebasestorage.app",
  apiKey: "AIzaSyAxeQ32p_P7m74Xq10vF1ePqhkJGLbRw6o",
  authDomain: "tourista-ckqlc.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "784309163308",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { db };
