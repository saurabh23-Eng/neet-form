import { auth } from "./config";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";

export const googleProvider = new GoogleAuthProvider();

export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

export const logoutUser = () => signOut(auth);

export const onAuthChange = (callback) =>
  onAuthStateChanged(auth, callback);

// ← ADD THIS NEW FUNCTION
export const registerUser = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);