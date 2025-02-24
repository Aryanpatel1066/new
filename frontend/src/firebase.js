import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCpfDBPyTx3YEQkUbYKZPfJvXeoIdYSPcY",
  authDomain: "stylestavvy-6df87.firebaseapp.com",
  projectId: "stylestavvy-6df87",
  storageBucket: "stylestavvy-6df87.firebasestorage.app",
  messagingSenderId: "171061141870",
  appId: "1:171061141870:web:4732d37b5b376ddc44e17f",
  measurementId: "G-NJCLS8RCEF"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
