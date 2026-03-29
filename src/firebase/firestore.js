import { db } from "./config";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";

export const submitStudentForm = async (uid, formData) => {
  await setDoc(doc(db, "students", uid), {
    ...formData,
    uid,
    submittedAt: serverTimestamp(),
  });
};

export const getStudentData = async (uid) => {
  const snap = await getDoc(doc(db, "students", uid));
  return snap.exists() ? snap.data() : null;
};

export const getAllStudents = async () => {
  const q = query(
    collection(db, "students"),
    orderBy("submittedAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

export const hasStudentSubmitted = async (uid) => {
  const snap = await getDoc(doc(db, "students", uid));
  return snap.exists();
};
