import React from 'react';
import { motion } from 'framer-motion';
import '../styles/components.css';

const PatientCard = ({ data }) => {
  if (!data) return null;

  return (
    <motion.div
      className="result-box"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      <p><strong>Patient ID:</strong> {data.patientId}</p>
      <p><strong>Name:</strong> {data.name}</p>
      <p><strong>Age:</strong> {data.age}</p>
      <p><strong>Gender:</strong> {data.gender}</p>
      <p><strong>Location:</strong> {data.location}</p>
      <p><strong>Date:</strong> {data.date}</p>
      <p><strong>Medical History:</strong> {data.medicalHistory}</p>
      <p><strong>Habits:</strong> {data.habits}</p>
      <div className="border-t pt-2">
        <p className="font-semibold">Case History:</p>
        <p><strong>Diagnosis:</strong> {data.caseHistory?.diagnosis}</p>
        <p><strong>Advice:</strong> {data.caseHistory?.advice}</p>
        <p><strong>Done:</strong> {data.caseHistory?.done}</p>
      </div>
      <p><strong>Recall:</strong> {data.recall}</p>
      <p><strong>Medication:</strong> {data.medication}</p>
      <p><strong>Notes:</strong> {data.notes}</p>
      <p><strong>Consultant:</strong> {data.consultant}</p>
      <p><strong>Referral:</strong> {data.referral}</p>
      <p><strong>Fee:</strong> ₹{data.fee}</p>
      <p><strong>Due:</strong> ₹{data.due}</p>
    </motion.div>
  );
};

export default PatientCard;