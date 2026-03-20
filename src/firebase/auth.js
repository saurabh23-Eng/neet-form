import { auth } from "./config";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

export const loginUser = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutUser = () => signOut(auth);

export const onAuthChange = (callback) =>
  onAuthStateChanged(auth, callback);