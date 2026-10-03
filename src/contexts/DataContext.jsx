import React, { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, onSnapshot, doc, getDoc } from 'firebase/firestore';
import { defaultData } from '../data/defaultData'; // We'll create default fallback data

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    let unsubscribes = [];
    let fetchedData = { ...defaultData };
    let loadedCollections = 0;
    const collectionsToLoad = ['home', 'about', 'education', 'skills', 'internships', 'projects', 'certifications', 'contact', 'settings'];

    const checkLoading = () => {
      loadedCollections++;
      if (loadedCollections === collectionsToLoad.length) {
        setData(fetchedData);
        setLoading(false);
      }
    };

    try {
      if (!db) {
        throw new Error("Firestore is not initialized.");
      }
      
      collectionsToLoad.forEach(colName => {
        const colRef = collection(db, colName);
        const unsub = onSnapshot(colRef, (snapshot) => {
          const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          
          setData(prev => ({
            ...prev,
            [colName]: docs
          }));
          
          if(loading) {
            fetchedData[colName] = docs;
            checkLoading();
          }
        }, (err) => {
          console.error(`Error loading collection ${colName}:`, err);
          if(loading) checkLoading(); // Proceed with defaults for this collection
        });
        unsubscribes.push(unsub);
      });
    } catch (err) {
      console.error("Firestore initialization error:", err);
      setError(err);
      setLoading(false);
    }

    return () => {
      unsubscribes.forEach(unsub => unsub());
    };
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};
