# SECTION 2: PROJECT REPORT

---

## CERTIFICATE PAGE


CERTIFICATE

This is to certify that the project entitled

"NEET Examination Portal Using React and Firebase"

has been successfully completed by

Saurabh Maurya (2308390100058),
Dhruv Narayan Singh (2308390100026),
Chandraj Kushwaha (2308390100024),
Ayush Maurya (2308390100019),

in fulfillment of the requirements for Software Engineering Lab (BCS651) in Computer Science and Engineering Department
from Rajkiya Engineering College , Kannauj, Dr. APJ Abdul Kalam Technical University , Lucknow
during the academic year 2025–2026.

Project Guide:                        Head of Department:
Mr.Naveen Tiwari                      Dr. BDK Patro
Mrs. Aishwarya Kumar                  Associate Professor
Computer Science & Engineering 
Department 

Date: 17 May 2026                     Place:Kannauj 


---

## DECLARATION
We, Saurabh Maurya , Dhruv Narayan Singh , Chandraj Kushwaha , Ayush Maurya, students of B.Tech in Computer Science and Engineering at Rajkiya Engineering College , Kannauj, hereby declare that the project entitled "NEET Examination Portal Using React and Firebase" submitted in fulfillment of the requirements is my own original work carried out under the guidance of Mr. Naveen Tiwari and Mrs. Aishwarya Kumar.

I further declare that this project has not been submitted to any other university or institution.

**Date: 17 May 2026**
**Place: Kannauj**


---

## ACKNOWLEDGEMENT

I would like to express my sincere gratitude to Mr. Naveen Tiwari and Mrs. Aishwarya Kumar for their invaluable guidance, encouragement, and support throughout this project. I extend my thanks to the Head of Department, Dr. BDK Patro, and all faculty members of the Computer Science and Engineering Department for their continuous support.

I am also grateful to Rajkiya Engineering College, Kannauj for providing the necessary infrastructure and resources. Special thanks to the Firebase and React open-source communities whose documentation and tools made this project possible.

Finally, I thank my family and friends for their moral support and encouragement.

**Saurabh Maurya ,
Dhruv Narayan Singh , 
Chandraj Kushwaha , 
Ayush Maurya**

---

## ABSTRACT

The NEET Examination Portal is a modern web-based application developed to simulate the online examination registration process for the National Eligibility cum Entrance Test. Built using React.js with the Vite build tool, Firebase Authentication, and Cloud Firestore, the system provides a complete student registration, login, form submission, and dashboard experience.

The application features Google Sign-In, protected routes, real-time database operations, and responsive design. It is deployed on GitHub Pages with a CI/CD pipeline using GitHub Actions. This project demonstrates the practical implementation of modern frontend development technologies, cloud-based backend services, and DevOps practices in an academic context.

**Keywords:** React.js, Firebase, Firestore, Authentication, GitHub Pages, NEET, Web Application, SPA

---

## CHAPTER 1: INTRODUCTION

### 1.1 Background

The digitization of examination systems has become increasingly important in modern education. Online portals for examination registration reduce administrative overhead, improve data accuracy, and provide students with a convenient application experience. The NEET Examination Portal simulates this environment using contemporary web technologies.

### 1.2 Motivation

Traditional paper-based examination registration processes are time-consuming, error-prone, and difficult to manage at scale. This project aims to demonstrate how modern web technologies can address these challenges effectively.

### 1.3 Problem Statement

Educational institutions lack accessible, lightweight, and cost-effective digital solutions for examination registration management. Existing systems are often complex, expensive, and require heavy server infrastructure. This project proposes a Firebase-powered React application that eliminates server management while providing full authentication, data persistence, and a responsive user experience.

### 1.4 Objectives

1. Develop a fully functional web-based examination registration portal.
2. Implement secure user authentication using Firebase.
3. Enable real-time data storage and retrieval using Cloud Firestore.
4. Implement protected routes for access control.
5. Deploy the application on GitHub Pages with CI/CD automation.
6. Ensure responsive design for all device types.

---

## CHAPTER 2: LITERATURE SURVEY

### 2.1 Existing Systems

| System | Features | Limitations |
|--------|----------|-------------|
| NTA NEET Portal | Official registration, admit card | Complex, government infrastructure |
| Google Forms | Simple data collection | No authentication, no dashboard |
| Traditional PHP systems | Server-side processing | Requires server management |

### 2.2 Review of Technologies

**React.js:** A declarative JavaScript library for building component-based user interfaces. Its virtual DOM ensures efficient rendering and its ecosystem supports complex SPA development.

**Firebase:** Google's Backend-as-a-Service platform offering authentication, Firestore database, cloud storage, and hosting. It eliminates the need for custom backend development.

**Vite:** A next-generation frontend build tool offering fast hot module replacement and optimized production builds.

**GitHub Pages & Actions:** Static site hosting with CI/CD automation enabling seamless deployment from code commits.

### 2.3 Research Gap

Existing academic projects either use heavy backend frameworks (Node.js, Django) or lack proper authentication. This project bridges the gap by using Firebase as a lightweight, scalable backend with full authentication support, deployed cost-free on GitHub Pages.

---

## CHAPTER 3: SYSTEM DESIGN

### 3.1 System Architecture

The application follows a three-tier architecture:

```
Presentation Layer → React.js Components (GitHub Pages)
Business Logic Layer → React Context, Hooks, Firebase SDK
Data Layer → Cloud Firestore, Firebase Authentication
```

### 3.2 Component Structure

```
src/
├── components/
│   ├── Navbar.jsx
│   └── ProtectedRoute.jsx
├── context/
│   └── AuthContext.jsx
├── firebase/
│   ├── config.js
│   ├── auth.js
│   └── firestore.js
├── pages/
│   ├── Login.jsx
│   ├── FormPage.jsx
│   └── Dashboard.jsx
├── App.jsx
└── main.jsx
```

### 3.3 Database Design

**Collection: students**
```
students (collection)
└── {uid} (document)
    ├── uid: string
    ├── name: string
    ├── email: string
    ├── dateOfBirth: string
    ├── category: string
    ├── subjects: array
    ├── phone: string
    └── submittedAt: timestamp
```

### 3.4 Authentication Flow

```
User → Login Page → Firebase Auth → JWT Token → Protected Route → Dashboard
```

---

## CHAPTER 4: IMPLEMENTATION

### 4.1 Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| Frontend Framework | React.js | 18.x |
| Build Tool | Vite | 5.x |
| Authentication | Firebase Auth | 10.x |
| Database | Cloud Firestore | 10.x |
| Routing | React Router DOM | 6.x |
| Hosting | GitHub Pages | - |
| CI/CD | GitHub Actions | - |
| Version Control | Git | - |

### 4.2 Key Implementation Details

**Firebase Configuration (config.js)**
- Firebase app initialized with environment variables
- Auth and Firestore instances exported for use across the app

**Authentication Context (AuthContext.jsx)**
- React Context API manages global authentication state
- Provides currentUser, login, logout, and Google sign-in functions
- onAuthStateChanged listener updates state on auth events

**Protected Routes (ProtectedRoute.jsx)**
- Wraps protected pages
- Redirects unauthenticated users to login page
- Uses React Router's Navigate component

**Form Submission (firestore.js)**
- setDoc writes form data to the students collection
- Document ID is set to the user's UID for easy retrieval
- serverTimestamp records submission time

**GitHub Actions (deploy.yml)**
- Triggers on push to main branch
- Installs dependencies and builds with Vite
- Injects Firebase environment variables from GitHub Secrets
- Deploys built files to gh-pages branch

### 4.3 Deployment Configuration

**vite.config.js**
```js
export default defineConfig({
  base: '/neet-form/',
  plugins: [react()],
})
```

**main.jsx**
```jsx
<BrowserRouter basename="/neet-form">
  <App />
</BrowserRouter>
```

---

## CHAPTER 5: TESTING

### 5.1 Testing Strategy

- **Unit Testing:** Individual component rendering
- **Integration Testing:** Firebase Auth and Firestore integration
- **System Testing:** End-to-end user workflows
- **UI Testing:** Responsive design across devices

### 5.2 Test Environment

- Browser: Google Chrome 120+
- Device: Desktop (1920×1080), Mobile (375×667)
- Network: Standard broadband

[Detailed test cases in Section 4 of this document]

---

## CHAPTER 6: RESULTS

### 6.1 Achieved Outcomes

- Fully functional student registration and login system
- Google Sign-In integration working
- Form data successfully persisting to Firestore
- Protected route navigation functioning correctly
- Application deployed and accessible at: https://saurabh23-eng.github.io/neet-form/
- GitHub Actions CI/CD pipeline operational
- Responsive design verified on mobile and desktop

### 6.2 Screenshots

[Insert Screenshot: Login Page]
[Insert Screenshot: Registration Page]
[Insert Screenshot: Student Dashboard]
[Insert Screenshot: Examination Form]
[Insert Screenshot: Admin Dashboard]
[Insert Screenshot: Firestore Data]
[Insert Screenshot: GitHub Actions Success]

---

## CHAPTER 7: ADVANTAGES, LIMITATIONS & FUTURE SCOPE

### 7.1 Advantages

1. No server management required — Firebase handles backend
2. Free hosting on GitHub Pages
3. Real-time data with Firestore
4. Secure authentication via Firebase
5. Fast performance with Vite build optimization
6. Automated deployment with GitHub Actions
7. Scalable architecture

### 7.2 Limitations

1. Firebase free tier has usage limits (50,000 reads/day)
2. GitHub Pages does not support server-side rendering
3. No actual examination conducting feature
4. Admin role not enforced via Firebase custom claims
5. No email verification implemented

### 7.3 Future Scope

1. Implement actual online examination module with timer
2. Add email verification on registration
3. Implement Firebase custom claims for proper admin role management
4. Add admit card generation as PDF
5. Integrate payment gateway for exam fee
6. Add multi-language support
7. Implement push notifications for exam updates
8. Upgrade to Firebase Blaze plan for higher limits

---

## CHAPTER 8: CONCLUSION

The NEET Examination Portal successfully demonstrates the development of a full-stack web application using modern technologies without traditional server infrastructure. The project integrates React.js for a dynamic frontend, Firebase for authentication and data management, and GitHub Pages with GitHub Actions for deployment and CI/CD.

All primary objectives were achieved: secure user authentication, form data persistence, protected routing, responsive design, and automated deployment. The project provides a strong foundation for building production-grade educational portals and showcases practical skills in modern web development, cloud services, and DevOps practices.

---

## REFERENCES

1. React Documentation. (2024). https://reactjs.org/docs
2. Firebase Documentation. (2024). https://firebase.google.com/docs
3. Vite Documentation. (2024). https://vitejs.dev/guide
4. React Router Documentation. (2024). https://reactrouter.com
5. GitHub Actions Documentation. (2024). https://docs.github.com/actions
6. MDN Web Docs. (2024). https://developer.mozilla.org
7. Pressman, R.S. (2014). Software Engineering: A Practitioner's Approach. McGraw-Hill.
8. Sommerville, I. (2016). Software Engineering (10th ed.). Pearson.

---
