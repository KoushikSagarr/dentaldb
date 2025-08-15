import React, { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from './firebase';
import { motion, AnimatePresence } from 'framer-motion';
import AddPatientForm from './components/AddPatientForm';
import SearchPatient from './components/SearchPatient';
import EditPatientForm from './components/EditPatientForm';
import DeletePatient from './components/DeletePatient';
import AllPatientsList from './components/AllPatientsList';
import './styles/global.css';
import './styles/components.css';

const Dashboard = () => {
  const [activeForm, setActiveForm] = useState('add');
  const appTitle = "Dr.Teja's Multispecialty Dental Care";

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const renderForm = () => {
    switch (activeForm) {
      case 'add':
        return <AddPatientForm key="add" />;
      case 'search':
        return <SearchPatient key="search" />;
      case 'edit':
        return <EditPatientForm key="edit" />;
      case 'delete':
        return <DeletePatient key="delete" />;
      case 'all':
        return <AllPatientsList key="all" />;
      default:
        return <AddPatientForm key="add" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', padding: '1rem 0' }}>
        <motion.h1
          style={{ margin: 0, color: 'white' }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 10 }}
        >
          {appTitle}
        </motion.h1>
        <button onClick={handleLogout} className="logout-btn" style={{ position: 'absolute', right: 0 }}>
          Logout
        </button>
      </div>

      <div className="flex-center">
        <button onClick={() => setActiveForm('add')}>Add Patient</button>
        <button onClick={() => setActiveForm('search')}>Get Patient</button>
        <button onClick={() => setActiveForm('edit')}>Edit Patient</button>
        <button onClick={() => setActiveForm('delete')}>Delete Patient</button>
        <button onClick={() => setActiveForm('all')}>Show All Patients</button>
      </div>

      <div id="formContainer">
        <AnimatePresence mode="wait">
          {renderForm()}
        </AnimatePresence>
      </div>

      <footer className="footer">
        <p>&copy; {new Date().getFullYear()} {appTitle}</p>
      </footer>
    </div>
  );
};

export default Dashboard;