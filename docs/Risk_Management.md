# SECTION 8: RISK MANAGEMENT

---

## Risk Register

| Risk ID | Risk Description | Probability | Impact | Risk Level | Mitigation Strategy |
|---------|-----------------|-------------|--------|------------|---------------------|
| R-01 | Firebase free tier limit exceeded | Low | High | Medium | Monitor usage; upgrade to Blaze if needed |
| R-02 | GitHub Pages downtime | Very Low | High | Low | Firebase Hosting as backup option |
| R-03 | Firebase API key exposure | Medium | High | High | Use GitHub Secrets and .gitignore for .env |
| R-04 | Breaking changes in Firebase SDK | Low | Medium | Low | Lock dependency versions in package.json |
| R-05 | React Router incompatibility | Low | Medium | Low | Test after each dependency upgrade |
| R-06 | Data loss in Firestore | Very Low | High | Medium | Enable Firestore backup and disaster recovery |
| R-07 | GitHub Actions workflow failure | Medium | Medium | Medium | Monitor Actions tab; fix errors promptly |
| R-08 | Cross-browser compatibility issues | Medium | Low | Low | Test on Chrome, Firefox, Edge, Safari |
| R-09 | Unauthorized admin access | Medium | High | High | Implement Firebase custom claims for admin |
| R-10 | Slow loading on mobile | Low | Medium | Low | Optimize bundle size with Vite code splitting |

---