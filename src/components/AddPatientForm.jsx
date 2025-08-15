import React, { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';
import '../styles/components.css';

const AddPatientForm = () => {
  const [formData, setFormData] = useState({
    patientId: '', name: '', age: '', gender: '', location: '', date: '',
    medicalHistory: '', medicalHistoryOther: '', habits: '', habitsOther: '',
    diagnosis: '', advice: '', done: '', recall: '', medication: '', notes: '',
    consultant: '', referral: '', fee: '', due: ''
  });
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('');

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Saving...');
    setStatusType('');

    const dataToSave = {
      ...formData,
      medicalHistory: formData.medicalHistory === "Other" ? formData.medicalHistoryOther : formData.medicalHistory,
      habits: formData.habits === "Other" ? formData.habitsOther : formData.habits,
      age: parseInt(formData.age),
      fee: parseFloat(formData.fee),
      due: parseFloat(formData.due),
      caseHistory: {
        diagnosis: formData.diagnosis,
        advice: formData.advice,
        done: formData.done,
      },
      createdAt: new Date(),
    };

    try {
      await setDoc(doc(db, 'patients', dataToSave.patientId), dataToSave);
      setStatus('✅ Patient saved successfully!');
      setStatusType('text-green-600');
      setFormData({
        patientId: '', name: '', age: '', gender: '', location: '', date: '',
        medicalHistory: '', medicalHistoryOther: '', habits: '', habitsOther: '',
        diagnosis: '', advice: '', done: '', recall: '', medication: '', notes: '',
        consultant: '', referral: '', fee: '', due: ''
      });
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to save patient.');
      setStatusType('text-red-600');
    }
  };

  return (
    <motion.form
      id="patientForm"
      className="form-section"
      onSubmit={handleSubmit}
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-2">Enter Patient Details</h2>
      <input id="patientId" placeholder="Patient ID" required value={formData.patientId} onChange={handleChange} />
      <input id="name" placeholder="Name" required value={formData.name} onChange={handleChange} />
      <input id="age" placeholder="Age" type="number" required value={formData.age} onChange={handleChange} />
      <select id="gender" required value={formData.gender} onChange={handleChange}>
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
      <input id="location" placeholder="Place/Location" value={formData.location} onChange={handleChange} />
      <input id="date" placeholder="Date" value={formData.date} onChange={handleChange} />
      <select id="medicalHistory" required value={formData.medicalHistory} onChange={handleChange}>
        <option value="">Medical History</option>
        <option>Hypertension</option>
        <option>Diabetes</option>
        <option>Other</option>
      </select>
      {formData.medicalHistory === "Other" && (
        <input id="medicalHistoryOther" placeholder="Enter other medical history" value={formData.medicalHistoryOther} onChange={handleChange} />
      )}
      <select id="habits" required value={formData.habits} onChange={handleChange}>
        <option value="">Habits</option>
        <option>Alcohol</option>
        <option>Smoking</option>
        <option>Tobacco Chewing</option>
        <option>Other</option>
      </select>
      {formData.habits === "Other" && (
        <input id="habitsOther" placeholder="Enter other habit" value={formData.habitsOther} onChange={handleChange} />
      )}
      <input id="diagnosis" placeholder="Rx Diagnosis" value={formData.diagnosis} onChange={handleChange} />
      <input id="advice" placeholder="Rx Advice" value={formData.advice} onChange={handleChange} />
      <input id="done" placeholder="Rx Done" value={formData.done} onChange={handleChange} />
      <input id="recall" placeholder="Recall" value={formData.recall} onChange={handleChange} />
      <input id="medication" placeholder="Medication" value={formData.medication} onChange={handleChange} />
      <textarea id="notes" placeholder="Notes" value={formData.notes} onChange={handleChange}></textarea>
      <input id="consultant" placeholder="Consultant Doctor Name" value={formData.consultant} onChange={handleChange} />
      <input id="referral" placeholder="Referral (optional)" value={formData.referral} onChange={handleChange} />
      <input id="fee" placeholder="Fee" type="number" value={formData.fee} onChange={handleChange} />
      <input id="due" placeholder="Due" type="number" value={formData.due} onChange={handleChange} />
      <button type="submit">Save Patient</button>
      {status && <p className={`text-sm mt-2 ${statusType}`}>{status}</p>}
    </motion.form>
  );
};

export default AddPatientForm;