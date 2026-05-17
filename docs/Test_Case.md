# SECTION 4: TEST CASES

---

## Test Cases Table

| Test ID | Module | Preconditions | Test Steps | Expected Result | Actual Result | Status |
|---------|--------|---------------|------------|-----------------|---------------|--------|
| TC-01 | Registration | App loaded, user not registered | 1. Open app 2. Navigate to register 3. Enter valid email and password 4. Click Register | Account created, redirected to dashboard | As expected | PASS |
| TC-02 | Registration | App loaded | Enter already registered email and password, click Register | Error: "Email already in use" displayed | As expected | PASS |
| TC-03 | Registration | App loaded | Leave email field empty, click Register | Validation error: "Email required" | As expected | PASS |
| TC-04 | Registration | App loaded | Enter invalid email format (e.g. abc@) | Validation error: "Invalid email" | As expected | PASS |
| TC-05 | Registration | App loaded | Enter password less than 6 characters | Error: "Password should be at least 6 characters" | As expected | PASS |
| TC-06 | Login | User registered | Enter correct email and password, click Login | Authenticated, redirected to dashboard | As expected | PASS |
| TC-07 | Login | User registered | Enter wrong password | Error: "Invalid credentials" | As expected | PASS |
| TC-08 | Login | App loaded | Enter unregistered email | Error: "User not found" | As expected | PASS |
| TC-09 | Google Sign-In | App loaded | Click Sign in with Google, select account | Authenticated with Google, redirected to dashboard | As expected | PASS |
| TC-10 | Protected Route | User not logged in | Manually navigate to /dashboard | Redirected to /login | As expected | PASS |
| TC-11 | Protected Route | User not logged in | Manually navigate to /form | Redirected to /login | As expected | PASS |
| TC-12 | Exam Form | User logged in | Fill all fields correctly, click Submit | Form submitted, success message shown, data in Firestore | As expected | PASS |
| TC-13 | Exam Form | User logged in | Leave mandatory field empty, click Submit | Validation error on empty field | As expected | PASS |
| TC-14 | Exam Form | User logged in | Enter invalid phone number format | Validation error displayed | As expected | PASS |
| TC-15 | Dashboard | User logged in with submitted form | Navigate to dashboard | Student data displayed correctly | As expected | PASS |
| TC-16 | Dashboard | User logged in, no form submitted | Navigate to dashboard | Empty state or prompt to fill form shown | As expected | PASS |
| TC-17 | Logout | User logged in | Click Logout button | Session cleared, redirected to login | As expected | PASS |
| TC-18 | Admin Dashboard | Admin logged in | Navigate to admin dashboard | All student submissions listed | As expected | PASS |
| TC-19 | Responsive Design | Any user | Open app on mobile browser (375px width) | Layout adapts, all elements accessible | As expected | PASS |
| TC-20 | Firestore Security | Unauthenticated request | Attempt direct Firestore API call without auth | Access denied by Firestore rules | As expected | PASS |
| TC-21 | Navigation | User logged in | Click all navbar links | Correct pages load without errors | As expected | PASS |
| TC-22 | Page Refresh | User logged in | Refresh browser on dashboard | User remains logged in, dashboard reloads | As expected | PASS |
| TC-23 | Environment Variables | Production build | Deploy with secrets, check Firebase connects | Firebase initializes without API key errors | As expected | PASS |
| TC-24 | GitHub Actions | Push to main branch | Trigger push, observe Actions tab | Workflow completes with green checkmark | As expected | PASS |

---