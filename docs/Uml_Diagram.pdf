# SECTION 3: UML DIAGRAMS

---

## 3.1 USE CASE DIAGRAM

```mermaid
graph TD
    Student((Student))
    Admin((Admin))

    Student --> UC1[Register]
    Student --> UC2[Login with Email]
    Student --> UC3[Login with Google]
    Student --> UC4[Fill Exam Form]
    Student --> UC5[View Dashboard]
    Student --> UC6[Logout]

    Admin --> UC7[View All Submissions]
    Admin --> UC8[View Student Details]
    Admin --> UC6

    UC1 --> Firebase[Firebase Auth]
    UC2 --> Firebase
    UC3 --> Firebase
    UC4 --> Firestore[Cloud Firestore]
    UC5 --> Firestore
    UC7 --> Firestore
    UC8 --> Firestore
```

**Explanation:** The Use Case Diagram illustrates the interactions between the two primary actors (Student and Admin) and the system's key functionalities. Students can register, log in, submit forms, and view their dashboard. Admins can view all submissions. Both actors interact with Firebase services.

---

## 3.2 CLASS DIAGRAM

```mermaid
classDiagram
    class App {
        +routes: Route[]
        +render()
    }

    class AuthContext {
        +currentUser: User
        +login(email, password)
        +logout()
        +googleSignIn()
        +register(email, password)
    }

    class ProtectedRoute {
        +children: Component
        +render()
    }

    class Login {
        +email: string
        +password: string
        +handleLogin()
        +handleGoogleSignIn()
        +render()
    }

    class FormPage {
        +formData: object
        +handleChange()
        +handleSubmit()
        +render()
    }

    class Dashboard {
        +studentData: object
        +fetchData()
        +render()
    }

    class Navbar {
        +currentUser: User
        +handleLogout()
        +render()
    }

    class FirestoreService {
        +submitStudentForm(uid, formData)
        +getStudentData(uid)
    }

    class FirebaseAuth {
        +signInWithEmail()
        +signInWithGoogle()
        +signOut()
        +onAuthStateChanged()
    }

    App --> AuthContext
    App --> ProtectedRoute
    Login --> AuthContext
    Login --> FirebaseAuth
    FormPage --> FirestoreService
    Dashboard --> FirestoreService
    Navbar --> AuthContext
    ProtectedRoute --> AuthContext
```

**Explanation:** The Class Diagram shows the structure of the main components and their relationships. AuthContext acts as the central state manager for authentication. FirestoreService handles all database operations. Each page component depends on either AuthContext or FirestoreService.

---

## 3.3 SEQUENCE DIAGRAM — LOGIN FLOW

```mermaid
sequenceDiagram
    actor Student
    participant LoginPage
    participant AuthContext
    participant FirebaseAuth
    participant Firestore
    participant Dashboard

    Student->>LoginPage: Enter email and password
    Student->>LoginPage: Click Login button
    LoginPage->>AuthContext: call login(email, password)
    AuthContext->>FirebaseAuth: signInWithEmailAndPassword()
    FirebaseAuth-->>AuthContext: Return User object
    AuthContext-->>LoginPage: Authentication success
    LoginPage->>Dashboard: Redirect to /dashboard
    Dashboard->>Firestore: getStudentData(uid)
    Firestore-->>Dashboard: Return student record
    Dashboard-->>Student: Display personalized dashboard
```

**Explanation:** This Sequence Diagram traces the interaction flow when a student logs in. The process begins at the Login page, passes through AuthContext to Firebase Authentication, and upon success, redirects to the Dashboard which fetches student data from Firestore.

---

## 3.4 ACTIVITY DIAGRAM — REGISTRATION

```mermaid
flowchart TD
    A([Start]) --> B[Open Registration Page]
    B --> C[Enter Name, Email, Password]
    C --> D{Validate Input}
    D -- Invalid --> E[Show Error Message]
    E --> C
    D -- Valid --> F[Call Firebase createUserWithEmailAndPassword]
    F --> G{Firebase Response}
    G -- Error: Email exists --> H[Show Email Exists Error]
    H --> C
    G -- Success --> I[Create User Record]
    I --> J[Redirect to Dashboard]
    J --> K([End])
```

**Explanation:** The Activity Diagram maps the complete registration workflow including input validation, Firebase account creation, error handling, and final redirection upon successful registration.

---

## 3.5 ER DIAGRAM

```mermaid
erDiagram
    USER {
        string uid PK
        string email
        string displayName
        string photoURL
        timestamp createdAt
    }

    STUDENT_FORM {
        string uid FK
        string name
        string dateOfBirth
        string category
        string phone
        string address
        array subjects
        timestamp submittedAt
    }

    ADMIN {
        string uid PK
        string email
        string role
    }

    USER ||--o| STUDENT_FORM : submits
    ADMIN ||--o{ STUDENT_FORM : views
```

**Explanation:** The ER Diagram represents the data relationships in Firestore. Each USER may submit one STUDENT_FORM, identified by the same UID. ADMIN users have view access to all STUDENT_FORM records.

---