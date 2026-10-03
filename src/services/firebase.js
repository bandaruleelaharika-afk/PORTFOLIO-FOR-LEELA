import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Replace with your Firebase config or use env variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBzpmCnPkgoUFdmEJEQ67nMMKOXjUbgHOI",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "harika-portfolio-ee03c.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "harika-portfolio-ee03c",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "harika-portfolio-ee03c.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "152024560386",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:152024560386:web:1831661f4dd874701e881b",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-4Q9JREKCNW"
};

let app, auth, db;

try {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
  // Provide dummy objects or handle gracefully so app doesn't crash completely
  // The DataContext and AuthContext should already check for these or handle errors
  auth = null;
  db = null;
}

export { auth, db };
