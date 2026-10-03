import React, { useState, useEffect } from 'react';
import { db } from '../../../services/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

const AdminAboutTab = () => {
  const [aboutText, setAboutText] = useState("");
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [editingEduId, setEditingEduId] = useState(null);
  const [eduForm, setEduForm] = useState({
    course: '', college: '', location: '', year: '', percentage: '', order: 0
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      const aboutSnap = await getDocs(collection(db, 'about'));
      if (!aboutSnap.empty) {
        setAboutText(aboutSnap.docs[0].data().summary || "");
      }
      
      const eduSnap = await getDocs(collection(db, 'education'));
      const eduData = eduSnap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a, b) => a.order - b.order);
      setEducation(eduData);
    } catch (error) {
      console.error("Error fetching about/education:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveAbout = async () => {
    await setDoc(doc(db, 'about', 'aboutContent'), {
      heading: 'ABOUT ME',
      summary: aboutText
    });
    alert("About content saved successfully!");
  };

  const handleEduChange = (e) => {
    setEduForm({ ...eduForm, [e.target.name]: e.target.value });
  };

  const handleEditEdu = (edu) => {
    setEditingEduId(edu.id);
    setEduForm(edu);
  };

  const handleDeleteEdu = async (id) => {
    if (window.confirm("Delete this education entry?")) {
      await deleteDoc(doc(db, 'education', id));
      fetchData();
    }
  };

  const handleSaveEdu = async (e) => {
    e.preventDefault();
    const idToSave = editingEduId || `edu_${Date.now()}`;
    await setDoc(doc(db, 'education', idToSave), {
      ...eduForm,
      order: Number(eduForm.order)
    });
    setEditingEduId(null);
    setEduForm({ course: '', college: '', location: '', year: '', percentage: '', order: 0 });
    fetchData();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="admin-tab-title">Manage About & Education</h2>
      
      <div className="card" style={{ marginBottom: '40px' }}>
        <h3>Professional Summary</h3>
        <textarea 
          value={aboutText} 
          onChange={(e) => setAboutText(e.target.value)} 
          rows="8" 
          style={{ width: '100%', padding: '10px', marginTop: '10px', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
        />
        <div style={{ marginTop: '10px' }}>
          <button onClick={handleSaveAbout} className="btn btn-primary">Save About Content</button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '30px' }}>
        <h3>{editingEduId ? 'Edit Education' : 'Add New Education'}</h3>
        <form onSubmit={handleSaveEdu}>
          <div className="admin-form-group">
            <label>Course</label>
            <input type="text" name="course" value={eduForm.course} onChange={handleEduChange} required />
          </div>
          <div className="admin-form-group">
            <label>College</label>
            <input type="text" name="college" value={eduForm.college} onChange={handleEduChange} required />
          </div>
          <div className="admin-form-group">
            <label>Location</label>
            <input type="text" name="location" value={eduForm.location} onChange={handleEduChange} required />
          </div>
          <div className="admin-form-group">
            <label>Year / Duration</label>
            <input type="text" name="year" value={eduForm.year} onChange={handleEduChange} required />
          </div>
          <div className="admin-form-group">
            <label>Percentage</label>
            <input type="text" name="percentage" value={eduForm.percentage} onChange={handleEduChange} required />
          </div>
          <div className="admin-form-group">
            <label>Display Order</label>
            <input type="number" name="order" value={eduForm.order} onChange={handleEduChange} required />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn btn-primary">{editingEduId ? 'Save Changes' : 'Add Education'}</button>
            {editingEduId && (
              <button type="button" className="btn btn-outline" onClick={() => { setEditingEduId(null); setEduForm({ course: '', college: '', location: '', year: '', percentage: '', order: 0 }); }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-list">
        <h3>Existing Education</h3>
        {education.map(edu => (
          <div key={edu.id} className="admin-list-item card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: '0 0 5px 0' }}>{edu.course}</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{edu.college} | {edu.year} | {edu.percentage}</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleEditEdu(edu)} className="btn btn-outline" style={{ padding: '5px 10px' }}>Edit</button>
              <button onClick={() => handleDeleteEdu(edu.id)} className="btn btn-primary" style={{ padding: '5px 10px', backgroundColor: '#ef4444' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAboutTab;
