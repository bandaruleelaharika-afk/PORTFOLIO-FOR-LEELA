import React, { useState, useEffect } from 'react';
import { db } from '../../../services/firebase';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';
import { uploadToCloudinary } from '../../../services/cloudinary';

const AdminSettingsTab = () => {
  const [formData, setFormData] = useState({
    email: '', phone: '', location: '', whatsappMessage: '', resumeUrl: '', profileImageUrl: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'settings'));
        if (!querySnapshot.empty) {
          const docData = querySnapshot.docs[0].data();
          setFormData(docData);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      let updatedData = { ...formData };
      
      if (profileImage) {
        const res = await uploadToCloudinary(profileImage);
        updatedData.profileImageUrl = res.url;
      }
      if (resumeFile) {
        const res = await uploadToCloudinary(resumeFile);
        updatedData.resumeUrl = res.url;
      }

      await setDoc(doc(db, 'settings', 'siteSettings'), updatedData);
      setFormData(updatedData);
      setMessage('Settings updated successfully.');
    } catch (error) {
      console.error("Error saving settings:", error);
      setMessage('Error saving settings.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="admin-tab-title">Site Settings</h2>
      {message && <div style={{ padding: '10px', backgroundColor: 'var(--bg-tertiary)', marginBottom: '20px', color: 'var(--accent)' }}>{message}</div>}
      
      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Profile Image</label>
            <input type="file" accept="image/*" onChange={(e) => setProfileImage(e.target.files[0])} />
            {formData.profileImageUrl && !profileImage && (
              <img src={formData.profileImageUrl} alt="Profile" className="admin-image-preview" />
            )}
          </div>
          <div className="admin-form-group">
            <label>Resume (PDF)</label>
            <input type="file" accept=".pdf" onChange={(e) => setResumeFile(e.target.files[0])} />
            {formData.resumeUrl && (
              <div style={{ marginTop: '10px' }}>
                <a href={formData.resumeUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>Current Resume</a>
              </div>
            )}
          </div>
          <div className="admin-form-group">
            <label>Contact Email</label>
            <input type="email" name="email" value={formData.email || ''} onChange={handleChange} />
          </div>
          <div className="admin-form-group">
            <label>Phone Number</label>
            <input type="text" name="phone" value={formData.phone || ''} onChange={handleChange} />
          </div>
          <div className="admin-form-group">
            <label>Location</label>
            <input type="text" name="location" value={formData.location || ''} onChange={handleChange} />
          </div>
          <div className="admin-form-group">
            <label>WhatsApp Message Template</label>
            <textarea name="whatsappMessage" value={formData.whatsappMessage || ''} onChange={handleChange} rows="2" />
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminSettingsTab;
