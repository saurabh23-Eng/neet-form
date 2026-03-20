import { db } from "./config";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

export const submitStudentForm = async (uid, formData) => {
  try {
    await setDoc(doc(db, "students", uid), {
      ...formData,
      uid,
      submittedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error("Error writing document: ", error);
    throw error;
  }
};

export const getStudentData = async (uid) => {
  const snap = await getDoc(doc(db, "students", uid));
  return snap.exists() ? snap.data() : null;
};