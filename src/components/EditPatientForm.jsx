import React, { useState } from 'react';
import { updateDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/components.css';

const EditPatientForm = () => {
  const [patientId, setPatientId] = useState('');
  const [patientData, setPatientData] = useState(null);
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('');

  const handleSearch = async () => {
    setStatus('Searching...');
    setStatusType('');
    setPatientData(null);

    if (!patientId) {
      setStatus('⚠️ Please enter a patient ID.');
      setStatusType('text-red-600');
      return;
    }

    try {
      const docRef = doc(db, 'patients', patientId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPatientData(docSnap.data());
        setStatus('✅ Patient found. You can now edit the details below.');
        setStatusType('text-green-600');
      } else {
        setStatus('❌ Patient not found.');
        setStatusType('text-red-600');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Error searching for patient.');
      setStatusType('text-red-600');
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPatientData(prev => ({ ...prev, [id]: value }));
  };

  const handleCaseHistoryChange = (e) => {
    const { id, value } = e.target;
    setPatientData(prev => ({
      ...prev,
      caseHistory: {
        ...prev.caseHistory,
        [id]: value
      }
    }));
  };

  const handleUpdate = async () => {
    setStatus('Updating...');
    setStatusType('');

    try {
      const docRef = doc(db, 'patients', patientId);
      await updateDoc(docRef, patientData);
      setStatus('✅ Patient updated successfully!');
      setStatusType('text-green-600');
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to update: ' + err.message);
      setStatusType('text-red-600');
    }
  };

  return (
    <motion.div
      className="form-section"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-4">Edit Patient</h2>
      
      {!patientData ? (
        <AnimatePresence>
          <motion.div
            key="search-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <input
              id="editPatientId"
              placeholder="Enter Patient ID to Edit"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            />
            <button id="searchBtn" onClick={handleSearch}>Load Patient</button>
            {status && <p className={`text-sm mt-2 ${statusType}`}>{status}</p>}
          </motion.div>
        </AnimatePresence>
      ) : (
        <AnimatePresence>
          <motion.div
            key="edit-form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="space-y-4">
              <input id="patientId" placeholder="Patient ID" required value={patientData.patientId} onChange={handleChange} />
              <input id="name" placeholder="Name" required value={patientData.name} onChange={handleChange} />
              <input id="age" placeholder="Age" type="number" required value={patientData.age} onChange={handleChange} />
              <select id="gender" required value={patientData.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <input id="location" placeholder="Place/Location" value={patientData.location} onChange={handleChange} />
              <input id="date" placeholder="Date" value={patientData.date} onChange={handleChange} />
              <select id="medicalHistory" required value={patientData.medicalHistory} onChange={handleChange}>
                <option value="">Medical History</option>
                <option>Hypertension</option>
                <option>Diabetes</option>
                <option>Other</option>
              </select>
              {patientData.medicalHistory === "Other" && (
                <input id="medicalHistoryOther" placeholder="Enter other medical history" value={patientData.medicalHistoryOther} onChange={handleChange} />
              )}
              <select id="habits" required value={patientData.habits} onChange={handleChange}>
                <option value="">Habits</option>
                <option>Alcohol</option>
                <option>Smoking</option>
                <option>Tobacco Chewing</option>
                <option>Other</option>
              </select>
              {patientData.habits === "Other" && (
                <input id="habitsOther" placeholder="Enter other habit" value={patientData.habitsOther} onChange={handleChange} />
              )}
              <input id="diagnosis" placeholder="Rx Diagnosis" value={patientData.caseHistory?.diagnosis || ''} onChange={handleCaseHistoryChange} />
              <input id="advice" placeholder="Rx Advice" value={patientData.caseHistory?.advice || ''} onChange={handleCaseHistoryChange} />
              <input id="done" placeholder="Rx Done" value={patientData.caseHistory?.done || ''} onChange={handleCaseHistoryChange} />
              <input id="recall" placeholder="Recall" value={patientData.recall} onChange={handleChange} />
              <input id="medication" placeholder="Medication" value={patientData.medication} onChange={handleChange} />
              <textarea id="notes" placeholder="Notes" value={patientData.notes} onChange={handleChange}></textarea>
              <input id="consultant" placeholder="Consultant Doctor Name" value={patientData.consultant} onChange={handleChange} />
              <input id="referral" placeholder="Referral (optional)" value={patientData.referral} onChange={handleChange} />
              <input id="fee" placeholder="Fee" type="number" value={patientData.fee} onChange={handleChange} />
              <input id="due" placeholder="Due" type="number" value={patientData.due} onChange={handleChange} />
              <button type="submit">Update Patient</button>
              {status && <p className={`text-sm mt-2 ${statusType}`}>{status}</p>}
            </form>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export default EditPatientForm;