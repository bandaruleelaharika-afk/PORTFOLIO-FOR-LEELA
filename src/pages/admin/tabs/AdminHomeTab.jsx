import React, { useState, useEffect } from 'react';
import { db } from '../../../services/firebase';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';

const AdminHomeTab = () => {
  const [formData, setFormData] = useState({
    greeting: "HAII, I'M",
    title: "Bandaru\nLeela Harika",
    description: "Passionate about software development...",
    label: "SOFTWARE DEVELOPMENT • AI • WEB TECHNOLOGIES",
    hireMeText: "Hire Me",
    getResumeText: "Get Resume"
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'home'));
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          setFormData(docData);
        }
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHomeData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      await setDoc(doc(db, 'home', 'homeContent'), formData);
      setMessage('Home content updated successfully.');
    } catch (error) {
      console.error("Error saving home data:", error);
      setMessage('Error saving data.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="admin-tab-title">Home Content</h2>
      {message && <div style={{ padding: '10px', backgroundColor: 'var(--bg-tertiary)', marginBottom: '20px', color: 'var(--accent)' }}>{message}</div>}
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Greeting</label>
            <input type="text" name="greeting" value={formData.greeting || ''} onChange={handleChange} />
          </div>
          <div className="admin-form-group">
            <label>Main Title (use \n for line breaks)</label>
            <textarea name="title" value={formData.title || ''} onChange={handleChange} rows="3" />
          </div>
          <div className="admin-form-group">
            <label>Professional Label</label>
            <input type="text" name="label" value={formData.label || ''} onChange={handleChange} />
          </div>
          <div className="admin-form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description || ''} onChange={handleChange} rows="5" />
          </div>
          <div className="admin-form-group">
            <label>Hire Me Button Text</label>
            <input type="text" name="hireMeText" value={formData.hireMeText || ''} onChange={handleChange} />
          </div>
          <div className="admin-form-group">
            <label>Get Resume Button Text</label>
            <input type="text" name="getResumeText" value={formData.getResumeText || ''} onChange={handleChange} />
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminHomeTab;
