import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import PatientCard from './PatientCard';
import '../styles/components.css';

const AllPatientsList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const q = query(collection(db, 'patients'), orderBy('name'));
        const snapshot = await getDocs(q);
        const patientsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setPatients(patientsData);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('❌ Failed to fetch patients.');
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  if (loading) {
    return <div className="form-section"><p>Loading...</p></div>;
  }

  if (error) {
    return <div className="form-section"><p className="text-red-600">{error}</p></div>;
  }

  return (
    <motion.div
      className="form-section"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-4">All Patients (Sorted by Name)</h2>
      <div className="patient-list">
        <AnimatePresence>
          {patients.map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <PatientCard data={patient} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AllPatientsList;