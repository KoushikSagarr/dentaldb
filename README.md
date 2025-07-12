# 🦷 Dr. Teja's Multi Speciality Dental Clinic Dashboard

A professional, responsive web application to manage patient records for a dental clinic. Built using **HTML**, **CSS**, **JavaScript**, and **Firebase Firestore** — no backend server needed.

> 🔐 Includes support for secure patient data storage and real-time access using Firebase.

---

## ✨ Features

- Add and retrieve patient records by **Patient ID or Name**
- Fields include medical history, habits, case history, medication, consultant, fees, etc.
- Clean, animated UI with a **light pink & purple professional theme**
- Smart dropdowns with "Other" option that allow custom input
- Fully mobile-responsive design
- Instant deployment via Vercel

---

## 📁 Folder Structure

/dental-dashboard
│
├── index.html # Main HTML file
├── styles.css # Custom themed CSS (pink & purple)
└── README.md # This documentation

markdown
Copy
Edit

---

## 🚀 Deployment

You can deploy this dashboard in minutes using [Vercel](https://vercel.com):

1. Push this code to GitHub.
2. Go to [vercel.com](https://vercel.com) → New Project.
3. Import your GitHub repo.
4. Set framework = **None (Static Site)**.
5. Deploy!

yaml
Copy
Edit

---

## 🔧 Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/).
2. Create a new project.
3. Set up Firestore (in test mode if needed).
4. Replace the config in `index.html`:

```js
const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  ...
};
```
---

## 📄 License

This project is licensed for personal or clinic use. Contact the author for commercial use.
