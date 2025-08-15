import React, { useState } from 'react';
import { getDoc, doc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import PatientCard from './PatientCard';
import { motion } from 'framer-motion';
import '../styles/components.css';

const SearchPatient = () => {
  const [searchValue, setSearchValue] = useState('');
  const [patientData, setPatientData] = useState(null);
  const [status, setStatus] = useState('');
  const [statusType, setStatusType] = useState('');

  const handleSearch = async () => {
    setStatus('Searching...');
    setPatientData(null);
    setStatusType('');

    try {
      const docRef = doc(db, 'patients', searchValue);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setPatientData(docSnap.data());
        setStatus('');
      } else {
        const q = query(collection(db, 'patients'), where('name', '==', searchValue));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setPatientData(querySnapshot.docs[0].data());
          setStatus('');
        } else {
          setStatus('❌ No patient found with given ID or Name.');
          setStatusType('text-red-600');
        }
      }
    } catch (error) {
      console.error(error);
      setStatus('❌ Error fetching patient data.');
      setStatusType('text-red-600');
    }
  };

  return (
    <motion.div
      className="search-box"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ type: "tween", duration: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-4">Search Patient</h2>
      <input
        id="searchInput"
        placeholder="Enter Patient ID or Name"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button onClick={handleSearch} className="w-full">Search</button>
      <div className="mt-4">
        {patientData ? <PatientCard data={patientData} /> : <p className={`mt-2 ${statusType}`}>{status}</p>}
      </div>
    </motion.div>
  );
};

export default SearchPatient;