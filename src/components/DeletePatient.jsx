import React, { useState } from 'react';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import '../styles/components.css';

const DeletePatient = () => {
  const [patientId, setPatientId] = useState('');
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('');

  const handleDelete = async () => {
    setStatus('');
    setStatusType('');

    if (!patientId) {
      setStatus('❌ Please enter a valid Patient ID.');
      setStatusType('text-red-600');
      return;
    }

    try {
      const docRef = doc(db, 'patients', patientId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        setStatus('❌ No patient found with that ID.');
        setStatusType('text-red-600');
        return;
      }

      await deleteDoc(docRef);
      setStatus('✅ Patient deleted successfully.');
      setStatusType('text-green-600');
    } catch (err) {
      console.error(err);
      setStatus('❌ Error deleting patient: ' + err.message);
      setStatusType('text-red-600');
    }
  };

  return (
    <motion.div
      className="form-section"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-4">Delete Patient</h2>
      <input
        id="deletePatientId"
        placeholder="Enter Patient ID to Delete"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
      />
      <button id="deleteBtn" onClick={handleDelete}>Delete</button>
      {status && <p className={`text-sm mt-2 ${statusType}`}>{status}</p>}
    </motion.div>
  );
};

export default DeletePatient;