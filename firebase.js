import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-storage.js";

/* 🔥 ONLY ONE CONFIG (KEEP THIS) */
const firebaseConfig = {
  apiKey: "AIzaSyD2gSi1B6GahWkba1tHAxvtG8vnhkv2-0Q",
  authDomain: "star-voice-bd.firebaseapp.com",
  projectId: "star-voice-bd",
  storageBucket: "star-voice-bd.firebasestorage.app",
  messagingSenderId: "266692297880",
  appId: "1:266692297880:web:39ee1c6e72666dc5737ced",
  measurementId: "G-K3VPB8W6CK"
};

const app = initializeApp(firebaseConfig);

/* EXPORT */
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export {
  signInWithEmailAndPassword,
  signOut,
  doc,
  setDoc,
  getDoc,
  ref,
  uploadBytes,
  getDownloadURL
};