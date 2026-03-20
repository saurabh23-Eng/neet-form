import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

const dummyStudents = [
  { uid: "zSZVfxk9g7SR87PPkXQI8HuSZAc2", fullName: "Saurabh Maurya", dob: "2004-05-10",
    phone: "9876543210", category: "OBC", attempts: 1,
    targetScore: 650, examYear: "2025", city: "Delhi",
    subjects: ["Physics"], coachingInstitute: "Allen", email: "saurabh@neet.com" },

    { uid: "LGIwnMdLNuUmbDVeMy2Z9blI7sr1", fullName: "Manish Singh", dob: "2003-05-10",
    phone: "9834524545", category: "OBC", attempts: 1,
    targetScore: 655, examYear: "2025", city: "Telangana",
    subjects: ["Chemistry"], coachingInstitute: "Akash", email: "manish@neet.com" },

    { uid: "0fkQZdx4iveefgnz0DrqmYkDkY02", fullName: "Shubham Yadav", dob: "2004-08-11",
    phone: "9876547667", category: "OBC", attempts: 2,
    targetScore: 620, examYear: "2025", city: "Pune",
    subjects: ["Physics"], coachingInstitute: "Byju's", email: "shubham@neet.com" },

    { uid: "r1cFkVOaUaP3sWxIPOD8pt99BMA3", fullName: "Gopal Jaiswal", dob: "2005-07-10",
    phone: "9834255656", category: "OBC", attempts: 2,
    targetScore: 658, examYear: "2025", city: "Chennai",
    subjects: ["Physics"], coachingInstitute: "Allen", email: "gopal@neet.com" },

    { uid: "zu1sSap5OGPrdQ7CQBZutA8Mdm13", fullName: "Irashad Ansari", dob: "2003-03-10",
    phone: "9876548989", category: "OBC", attempts: 4,
    targetScore: 659, examYear: "2025", city: "Delhi",
    subjects: ["Physics"], coachingInstitute: "Akash", email: "irashad@neet.com" },

    { uid: "JfiCfNIL84Q6Rqg307kpD5UsROz1", fullName: "DNS", dob: "2005-05-10",
    phone: "9876546765", category: "GEN", attempts: 2,
    targetScore: 655, examYear: "2025", city: "Delhi",
    subjects: ["Physics"], coachingInstitute: "Allen", email: "dns@neet.com" },

    { uid: "4qbZW1Pq62MQQsvqpEscU4Z3JF52", fullName: "ANS", dob: "2003-05-10",
    phone: "9876546778", category: "OBC", attempts: 2,
    targetScore: 550, examYear: "2025", city: "Delhi",
    subjects: ["Chemistry"], coachingInstitute: "Allen", email: "ans@neet.com" },

    { uid: "81HmfEzZ9JM7zXf9nL4VW5Koibh1", fullName: "Shubham Gupta", dob: "2002-04-10",
    phone: "8355098454", category: "OBC", attempts: 3,
    targetScore: 640, examYear: "2024", city: "Mumbai",
    subjects: ["Physics"], coachingInstitute: "Allen", email: "gupta@neet.com" },

    { uid: "YoLEKOliSlfQAfKnesy4u0PnpHt2", fullName: "Divyanshu", dob: "2003-05-10",
    phone: "9834567890", category: "SC", attempts: 3,
    targetScore: 659, examYear: "2025", city: "Delhi",
    subjects: ["Physics"], coachingInstitute: "Allen", email: "divya@neet.com" },

    { uid: "CsdpLVg6HkUkYIsL0I12Ieb58yJ2", fullName: "Golu Maurya", dob: "2002-05-10",
    phone: "9876544534", category: "OBC", attempts: 2,
    targetScore: 650, examYear: "2025", city: "Delhi",
    subjects: ["Physics"], coachingInstitute: "Byjus", email: "golu@neet.com" },
  // ... repeat for all 10 students with their UIDs from Firebase Auth
];

export const seedFirestore = async () => {
  for (const student of dummyStudents) {
    await setDoc(doc(db, "students", student.uid), student);
  }
  console.log("Seeding done!");
};
