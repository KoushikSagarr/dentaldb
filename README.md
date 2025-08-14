# 🦷 Dr. Teja's Multispecialty Dental Care Dashboard

A modern, animated web application for managing patient records at a dental clinic. This dashboard provides a secure and intuitive interface for performing CRUD (Create, Read, Update, Delete) operations on patient data, built with a professional dark theme and top-notch user experience.

-----

### ✨ Features

  * **Secure Authentication**: Users can log in securely using either an email/password or a Google account.
  * **Intuitive Dashboard**: A clean, dark-themed interface for managing all patient records.
  * **CRUD Operations**: Easily add new patients, retrieve existing records, update patient information, and delete records.
  * **Real-time Database**: Patient data is stored and managed in a Firebase Firestore NoSQL database, ensuring real-time updates.
  * **Dynamic Animations**: Smooth page transitions, animated component entrances, and interactive elements powered by Framer Motion.
  * **Responsive Design**: The application is designed to be fully functional and visually appealing on various screen sizes.

-----

### 💻 Technologies Used

  * **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
  * **[Vite](https://vitejs.dev/)**: A fast front-end build tool that provides a modern development experience.
  * **[Firebase](https://firebase.google.com/)**: Google's backend-as-a-service platform for user authentication and Firestore database.
  * **[Framer Motion](https://www.framer.com/motion/)**: A powerful production-ready library for React animations.
  * **[HTML5](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)** & **[CSS3](https://developer.mozilla.org/en-US/docs/Glossary/CSS)**: The core web technologies for structuring and styling the application.

-----

### 🚀 Installation & Setup

Follow these steps to get a local copy of the project up and running on your machine.

#### 1\. Clone the repository

```bash
git clone <repository-url>
cd dental-dashboard
```

#### 2\. Install dependencies

Install the project's dependencies using npm.

```bash
npm install
```

#### 3\. Configure Firebase

You need to set up your own Firebase project to use this application.

  * Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
  * Enable **Firestore Database** and **Authentication** (with Email/Password and Google Sign-in providers).
  * In your Project Settings, find your web app's configuration object.
  * Create a new file `src/firebase.js` in your project and add your Firebase config, like so:

<!-- end list -->

```javascript
// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  // Your config will go here
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
```

#### 4\. Run the application

Start the development server.

```bash
npm run dev
```

The application will now be running on `http://localhost:5173`.

-----

### 📋 Usage

1.  **Login**: Use an email/password or a Google account. You must create a user in the Firebase Console before you can log in.
2.  **Add Patient**: Navigate to the "Add Patient" tab and fill out the form. The patient will be saved to your Firestore database.
3.  **Get Patient**: Search for a patient by their ID or name to view their full record.
4.  **Edit Patient**: Load a patient's record to make changes to any of the fields and save the updated data.
5.  **Show All Patients**: View a full list of all patients in the database, with dynamic scroll animations.

-----

### 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

-----

### 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

-----

### 🙏 Acknowledgments

  * [Firebase Documentation](https://firebase.google.com/docs)
  * [Framer Motion Documentation](https://www.framer.com/motion/)
  * [Vite Documentation](https://vitejs.dev/)
