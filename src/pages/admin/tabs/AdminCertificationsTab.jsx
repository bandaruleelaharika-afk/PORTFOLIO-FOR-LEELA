import React, { useState, useEffect } from 'react';
import { db } from '../../../services/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { uploadToCloudinary } from '../../../services/cloudinary';
import { Edit2, Trash2, Plus, ExternalLink, Image as ImageIcon, FileText } from 'lucide-react';

const AdminCertificationsTab = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCert, setCurrentCert] = useState(null);
  const [formData, setFormData] = useState({
    title: '', organization: '', year: '', order: 0
  });
  const [coverFile, setCoverFile] = useState(null);
  const [certFile, setCertFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'certifications'));
      const certs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCertifications(certs.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error("Error fetching certifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'order' ? Number(value) : value });
  };

  const resetForm = () => {
    setFormData({ title: '', organization: '', year: '', order: certifications.length + 1 });
    setCoverFile(null);
    setCertFile(null);
    setIsEditing(false);
    setCurrentCert(null);
  };

  const handleEdit = (cert) => {
    setIsEditing(true);
    setCurrentCert(cert);
    setFormData({
      title: cert.title || '',
      organization: cert.organization || '',
      year: cert.year || '',
      order: cert.order || 0
    });
    setCoverFile(null);
    setCertFile(null);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      try {
        await deleteDoc(doc(db, 'certifications', id));
        fetchCertifications();
        setMessage('Certification deleted successfully.');
      } catch (error) {
        console.error("Error deleting certification:", error);
        setMessage('Error deleting certification.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage('');

    try {
      let coverUrl = currentCert?.coverUrl || '';
      let certificateUrl = currentCert?.certificateUrl || '';

      if (coverFile) {
        const coverRes = await uploadToCloudinary(coverFile);
        coverUrl = coverRes.url;
      }

      if (certFile) {
        const certRes = await uploadToCloudinary(certFile);
        certificateUrl = certRes.url;
      }

      const certData = {
        ...formData,
        coverUrl,
        certificateUrl
      };

      if (isEditing && currentCert) {
        await updateDoc(doc(db, 'certifications', currentCert.id), certData);
        setMessage('Certification updated successfully.');
      } else {
        await addDoc(collection(db, 'certifications'), certData);
        setMessage('Certification added successfully.');
      }

      resetForm();
      fetchCertifications();
    } catch (error) {
      console.error("Error saving certification:", error);
      setMessage('Error saving certification.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="admin-tab-header">
        <h2 className="admin-tab-title">Manage Certifications</h2>
        {!isEditing && (
          <button className="btn btn-primary" onClick={() => { resetForm(); setIsEditing(true); }}>
            <Plus size={18} /> Add Certification
          </button>
        )}
      </div>

      {message && <div style={{ padding: '10px', backgroundColor: 'var(--bg-tertiary)', marginBottom: '20px', color: 'var(--accent)' }}>{message}</div>}

      {isEditing ? (
        <div className="card">
          <h3>{currentCert ? 'Edit Certification' : 'Add New Certification'}</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <div className="admin-form-group">
              <label>Certification Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
            </div>
            <div className="admin-form-group">
              <label>Organization</label>
              <input type="text" name="organization" value={formData.organization} onChange={handleInputChange} required />
            </div>
            <div className="admin-form-group">
              <label>Year</label>
              <input type="text" name="year" value={formData.year} onChange={handleInputChange} />
            </div>
            <div className="admin-form-group">
              <label>Display Order</label>
              <input type="number" name="order" value={formData.order} onChange={handleInputChange} />
            </div>
            
            <div className="admin-form-group">
              <label><ImageIcon size={16} style={{display:'inline', verticalAlign:'middle'}}/> Cover Image (Thumbnail)</label>
              <input type="file" accept="image/*" onChange={(e) => setCoverFile(e.target.files[0])} />
              {currentCert?.coverUrl && !coverFile && (
                <img src={currentCert.coverUrl} alt="Cover Preview" className="admin-image-preview" />
              )}
            </div>

            <div className="admin-form-group">
              <label><FileText size={16} style={{display:'inline', verticalAlign:'middle'}}/> Certificate File (Image or PDF)</label>
              <input type="file" accept="image/*,.pdf" onChange={(e) => setCertFile(e.target.files[0])} />
              {currentCert?.certificateUrl && (
                <div style={{ marginTop: '10px' }}>
                  <a href={currentCert.certificateUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>
                    Current Certificate Attached <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>

            <div className="admin-actions" style={{ marginTop: '30px' }}>
              <button type="submit" className="btn btn-primary" disabled={uploading}>
                {uploading ? 'Saving...' : 'Save Certification'}
              </button>
              <button type="button" className="btn btn-outline" onClick={resetForm} disabled={uploading}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="admin-list">
          {certifications.length === 0 ? (
            <p>No certifications found.</p>
          ) : (
            certifications.map(cert => (
              <div key={cert.id} className="admin-list-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  {cert.coverUrl ? (
                    <img src={cert.coverUrl} alt="Cover" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                  ) : (
                    <div style={{ width: '60px', height: '40px', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>No Img</div>
                  )}
                  <div>
                    <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>{cert.title}</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{cert.organization} | Order: {cert.order}</span>
                  </div>
                </div>
                <div className="admin-actions">
                  {cert.certificateUrl && (
                    <a href={cert.certificateUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline admin-btn-sm" title="View Certificate">
                      <ExternalLink size={16} />
                    </a>
                  )}
                  <button onClick={() => handleEdit(cert)} className="btn btn-outline admin-btn-sm" title="Edit">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(cert.id)} className="btn btn-outline admin-btn-sm" style={{ color: '#ff4d4f', borderColor: '#ff4d4f' }} title="Delete">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminCertificationsTab;
