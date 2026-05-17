# SECTION 1: SOFTWARE REQUIREMENTS SPECIFICATION (SRS)

---

## TITLE PAGE

```
SOFTWARE REQUIREMENTS SPECIFICATION

Project Title: NEET Examination Portal Using React and Firebase

Prepared by: [Student Name]
Roll No: [Roll Number]
Department: [Department Name]
College: [College Name]
University: [University Name]
Guide: [Guide Name]
Academic Year: 2025–2026
Version: 1.0
Date: [Date]
```

---

## ABSTRACT

This Software Requirements Specification (SRS) document describes the functional and non-functional requirements for the NEET Examination Portal, a web-based application developed using React.js (Vite), Firebase Authentication, and Cloud Firestore. The system allows students to register, log in, fill out examination application forms, and access a personalized dashboard. An administrative interface provides record management capabilities. The portal is deployed on GitHub Pages for public accessibility.

---

## TABLE OF CONTENTS

1. Introduction
2. Purpose
3. Scope
4. Definitions, Acronyms, and Abbreviations
5. Overall Description
6. Product Perspective
7. User Classes and Characteristics
8. Functional Requirements
9. Non-Functional Requirements
10. External Interface Requirements
11. Use Case Descriptions
12. Assumptions and Constraints
13. Appendix

---

## 1. INTRODUCTION

### 1.1 Purpose

The purpose of this SRS document is to provide a detailed description of the NEET Examination Portal web application. It defines the scope, system features, functional and non-functional requirements, and constraints of the system. This document is intended for use by developers, testers, project guides, and academic evaluators.

### 1.2 Scope

The NEET Examination Portal is a web application that simulates an online examination registration and management system for the National Eligibility cum Entrance Test (NEET). The system enables:

- Student self-registration and secure login
- Google Sign-In integration
- Examination application form submission
- Student dashboard access
- Admin-level management of student records
- Responsive design for cross-device compatibility
- Deployment on a publicly accessible URL via GitHub Pages

The system does not conduct actual examinations but simulates the registration and management workflow.

### 1.3 Definitions, Acronyms, and Abbreviations

| Term | Definition |
|------|------------|
| NEET | National Eligibility cum Entrance Test |
| SRS | Software Requirements Specification |
| UI | User Interface |
| API | Application Programming Interface |
| Firebase | Google's Backend-as-a-Service platform |
| Firestore | Cloud-hosted NoSQL database by Firebase |
| React | JavaScript library for building user interfaces |
| Vite | Frontend build tool for React applications |
| UID | User Identifier (Firebase unique user ID) |
| JWT | JSON Web Token |
| CRUD | Create, Read, Update, Delete |
| OAuth | Open Authorization (used in Google Sign-In) |

### 1.4 References

- React Documentation: https://reactjs.org
- Firebase Documentation: https://firebase.google.com/docs
- GitHub Pages: https://pages.github.com
- Vite Documentation: https://vitejs.dev

---

## 2. OVERALL DESCRIPTION

### 2.1 Product Perspective

The NEET Examination Portal is a standalone web application that integrates with Firebase services for authentication and data persistence. It operates as a Single Page Application (SPA) using React.js and communicates with Cloud Firestore in real time.

```
[Browser Client]
      |
      ↓
[React SPA - GitHub Pages]
      |
      ↓
[Firebase Services]
   |         |
[Auth]   [Firestore]
```

### 2.2 Product Functions

- User Registration and Login
- Google OAuth Sign-In
- Protected Route Navigation
- Examination Form Submission
- Student Dashboard
- Admin Dashboard
- Data Persistence via Firestore
- Responsive UI

### 2.3 User Classes and Characteristics

| User Class | Description | Technical Level |
|------------|-------------|-----------------|
| Student | Registers, logs in, fills exam form, views dashboard | Low |
| Admin | Views and manages all student submissions | Medium |
| Developer | Maintains codebase and deployment pipeline | High |

### 2.4 Operating Environment

- **Browser:** Chrome, Firefox, Edge, Safari (latest versions)
- **Device:** Desktop, tablet, mobile
- **Internet:** Required for Firebase connectivity
- **OS:** Windows, macOS, Linux, Android, iOS

### 2.5 Design and Implementation Constraints

- Firebase free tier (Spark plan) limits apply
- GitHub Pages only supports static file hosting
- No server-side rendering support
- React Router requires basename configuration for GitHub Pages

### 2.6 Assumptions and Dependencies

- Users have a valid internet connection
- Firebase project is active and properly configured
- GitHub Actions workflow is configured for CI/CD
- Users have a valid email address for registration

---

## 3. FUNCTIONAL REQUIREMENTS

### FR-01: User Registration
- The system shall allow new users to register using email and password.
- The system shall validate email format and password strength.
- The system shall store user credentials securely via Firebase Authentication.

### FR-02: User Login
- The system shall authenticate registered users with email and password.
- The system shall display appropriate error messages on invalid credentials.

### FR-03: Google Sign-In
- The system shall support Google OAuth 2.0 sign-in.
- The system shall retrieve and store user profile information from Google.

### FR-04: Protected Routes
- The system shall restrict access to the dashboard and form pages to authenticated users only.
- Unauthenticated users shall be redirected to the login page.

### FR-05: Examination Form
- The system shall provide a form for students to submit their examination application details.
- The form shall include fields such as name, date of birth, category, subject choices, and contact details.
- The system shall validate all mandatory fields before submission.

### FR-06: Student Dashboard
- The system shall display a personalized dashboard for each logged-in student.
- The dashboard shall show submitted form data and application status.

### FR-07: Admin Dashboard
- The system shall provide an admin view to list all student submissions.
- The admin shall be able to view individual student records.

### FR-08: Logout
- The system shall allow users to log out securely.
- Upon logout, the session shall be cleared and the user redirected to the login page.

### FR-09: Data Persistence
- All submitted form data shall be stored in Cloud Firestore.
- Data shall persist across sessions and browser refreshes.

### FR-10: Responsive Design
- The application shall be fully responsive and functional on mobile, tablet, and desktop screens.

---

## 4. NON-FUNCTIONAL REQUIREMENTS

### 4.1 Performance
- Pages shall load within 3 seconds on a standard broadband connection.
- Firestore read/write operations shall complete within 2 seconds under normal load.

### 4.2 Security
- User passwords shall be managed exclusively by Firebase Authentication (never stored in plaintext).
- Firestore security rules shall restrict data access to authenticated users only.
- Environment variables shall be used to protect Firebase API keys.

### 4.3 Reliability
- The system shall have 99% uptime dependent on Firebase and GitHub Pages availability.
- The system shall handle network errors gracefully with user-friendly messages.

### 4.4 Usability
- The UI shall be intuitive and require no technical knowledge to operate.
- Error messages shall be clear and actionable.

### 4.5 Maintainability
- The codebase shall follow component-based React architecture.
- All configuration shall be managed via environment variables.

### 4.6 Scalability
- The Firebase Firestore backend shall support scaling up to the free tier limits without code changes.

---

## 5. EXTERNAL INTERFACE REQUIREMENTS

### 5.1 User Interface
- Navigation bar on all pages
- Login and registration forms with validation
- Multi-field examination application form
- Dashboard with data display cards
- Responsive layout using CSS/Tailwind

### 5.2 Hardware Interface
- Standard web browser on any internet-connected device

### 5.3 Software Interface
- Firebase Authentication API
- Cloud Firestore API
- Google OAuth API
- GitHub Actions for CI/CD

### 5.4 Communication Interface
- HTTPS for all communications
- Firebase SDK for real-time database communication

---

## 6. USE CASE DESCRIPTIONS

### UC-01: Student Registration
| Field | Details |
|-------|---------|
| Use Case ID | UC-01 |
| Name | Student Registration |
| Actor | Student |
| Precondition | User is not registered |
| Main Flow | 1. User opens registration page. 2. Enters name, email, password. 3. Clicks Register. 4. System validates input. 5. Firebase creates account. 6. User redirected to dashboard. |
| Alternate Flow | If email already exists, show error message. |
| Postcondition | User account created and session active |

### UC-02: Student Login
| Field | Details |
|-------|---------|
| Use Case ID | UC-02 |
| Name | Student Login |
| Actor | Student |
| Precondition | User is registered |
| Main Flow | 1. User opens login page. 2. Enters email and password. 3. Clicks Login. 4. Firebase authenticates. 5. User redirected to dashboard. |
| Alternate Flow | Invalid credentials show error. |
| Postcondition | User authenticated and session started |

### UC-03: Form Submission
| Field | Details |
|-------|---------|
| Use Case ID | UC-03 |
| Name | Examination Form Submission |
| Actor | Student |
| Precondition | User is logged in |
| Main Flow | 1. User navigates to form page. 2. Fills all required fields. 3. Clicks Submit. 4. System validates. 5. Data saved to Firestore. 6. Confirmation shown. |
| Alternate Flow | Validation errors highlighted on incomplete fields. |
| Postcondition | Form data stored in Firestore under student UID |

---
