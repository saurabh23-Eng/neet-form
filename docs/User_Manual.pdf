# SECTION 5: USER MANUAL

---

## 5.1 INSTALLATION GUIDE (Local Development)

### Prerequisites

- Node.js v20 or higher
- npm v9 or higher
- Git
- A Firebase project (free Spark plan)
- VS Code (recommended)

### Step 1: Clone the Repository

```bash
git clone https://github.com/saurabh23-eng/neet-form.git
cd neet-form
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure Firebase

1. Go to https://console.firebase.google.com
2. Create a new project or use existing
3. Add a Web App to the project
4. Copy the config values

### Step 4: Create Environment File

Create a `.env` file in the root directory:

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Step 5: Run Locally

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

---

## 5.2 FIREBASE SETUP

### Enable Authentication

1. Firebase Console → Authentication → Get Started
2. Sign-in method → Enable Email/Password
3. Sign-in method → Enable Google

### Enable Firestore

1. Firebase Console → Firestore Database → Create database
2. Start in test mode (then update rules)
3. Update rules to:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 5.3 DEPLOYMENT STEPS

### Step 1: Push to GitHub

```bash
git add .
git commit -m "initial commit"
git push -u origin main
```

### Step 2: Add GitHub Secrets

Go to: Repository → Settings → Secrets and variables → Actions

Add all 6 Firebase environment variables as repository secrets.

### Step 3: Enable GitHub Pages

Go to: Repository → Settings → Pages
Set source to: gh-pages branch

### Step 4: GitHub Actions Auto-Deploy

Every push to main branch automatically triggers the workflow and deploys to GitHub Pages.

---

## 5.4 USER INSTRUCTIONS

### For Students

**Registration:**
1. Open https://saurabh23-eng.github.io/neet-form/
2. Click Register
3. Enter your name, email, and password
4. Click Register button
5. You will be redirected to your dashboard

[Insert Screenshot: Registration Page]

**Login:**
1. Enter your registered email and password
2. Click Login
3. Or click Sign in with Google

[Insert Screenshot: Login Page]

**Fill Examination Form:**
1. After login, click Form in the navigation
2. Fill all required fields
3. Click Submit
4. You will see a success confirmation

[Insert Screenshot: Examination Form]

**View Dashboard:**
1. Click Dashboard in the navigation
2. Your submitted information will be displayed

[Insert Screenshot: Student Dashboard]

**Logout:**
1. Click Logout in the navigation bar
2. You will be redirected to the login page

---
