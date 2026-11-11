import React, { useState, useEffect } from 'react';
import { db } from '../../../services/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { uploadToCloudinary } from '../../../services/cloudinary';
import { 
  Award, Edit2, Trash2, Plus, ExternalLink, Image as ImageIcon, 
  FileText, CheckCircle2, AlertCircle, RefreshCw, Eye, Sparkles, X
} from 'lucide-react';

const THEME_OPTIONS = [
  { id: 'mint', label: 'Theme 01 — Deep Navy & Mint' },
  { id: 'blue', label: 'Theme 02 — Lighter Navy & Ice Blue' },
  { id: 'emerald', label: 'Theme 03 — Deep Navy & Soft Emerald' },
  { id: 'teal', label: 'Theme 04 — Blue Navy & Subtle Teal' },
];

const AdminCertificationsTab = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCert, setCurrentCert] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '',
    organization: '',
    year: '',
    description: '',
    order: 1,
    theme: 'mint'
  });

  const [coverFile, setCoverFile] = useState(null);
  const [certFile, setCertFile] = useState(null);
  const [coverPreviewUrl, setCoverPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'certifications'));
      const certs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCertifications(certs.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0)));
    } catch (error) {
      console.error("Error fetching certifications:", error);
      setStatusMsg({ type: 'error', text: 'Error fetching certifications from Firestore.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'order' ? Number(value) : value
    }));
  };

  const handleCoverFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverFile(file);
      setCoverPreviewUrl(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      organization: '',
      year: '',
      description: '',
      order: (certifications.length || 0) + 1,
      theme: 'mint'
    });
    setCoverFile(null);
    setCertFile(null);
    setCoverPreviewUrl('');
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
      description: cert.description || '',
      order: Number(cert.order) || 1,
      theme: cert.theme || 'mint'
    });
    setCoverFile(null);
    setCertFile(null);
    setCoverPreviewUrl(cert.coverUrl || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      try {
        await deleteDoc(doc(db, 'certifications', id));
        setStatusMsg({ type: 'success', text: 'Certification deleted successfully.' });
        fetchCertifications();
      } catch (error) {
        console.error("Error deleting certification:", error);
        setStatusMsg({ type: 'error', text: 'Failed to delete certification.' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setStatusMsg({ type: '', text: '' });

    try {
      let coverUrl = currentCert?.coverUrl || '';
      let certificateUrl = currentCert?.certificateUrl || '';

      // Upload Cover Image to Cloudinary if a new file was chosen
      if (coverFile) {
        setStatusMsg({ type: 'info', text: 'Uploading cover image to Cloudinary...' });
        const coverRes = await uploadToCloudinary(coverFile);
        coverUrl = coverRes.url;
      }

      // Upload Certificate Document/Image to Cloudinary if chosen
      if (certFile) {
        setStatusMsg({ type: 'info', text: 'Uploading certificate document to Cloudinary...' });
        const certRes = await uploadToCloudinary(certFile);
        certificateUrl = certRes.url;
      }

      const certData = {
        title: formData.title.trim(),
        organization: formData.organization.trim(),
        year: formData.year.trim(),
        description: formData.description.trim(),
        order: Number(formData.order) || 1,
        theme: formData.theme || 'mint',
        coverUrl,
        certificateUrl,
        updatedAt: new Date().toISOString()
      };

      if (isEditing && currentCert) {
        await updateDoc(doc(db, 'certifications', currentCert.id), certData);
        setStatusMsg({ type: 'success', text: 'Certification updated successfully in Firestore!' });
      } else {
        await addDoc(collection(db, 'certifications'), certData);
        setStatusMsg({ type: 'success', text: 'New certification added successfully to Firestore!' });
      }

      resetForm();
      fetchCertifications();
    } catch (error) {
      console.error("Error saving certification:", error);
      setStatusMsg({ type: 'error', text: 'Failed to save certification. Please check network/Cloudinary settings.' });
    } finally {
      setUploading(false);
    }
  };

  if (loading && !certifications.length) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <RefreshCw size={24} className="spin-animation" style={{ display: 'inline-block', marginBottom: '12px' }} />
        <p>Loading certifications from Firestore...</p>
      </div>
    );
  }

  return (
    <div className="admin-certifications-wrapper">
      <div className="admin-tab-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 className="admin-tab-title" style={{ margin: 0 }}>Manage Certifications</h2>
          <p style={{ margin: '5px 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Control all 4 certification cards, descriptions, order, Cloudinary cover images, and certificate documents.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            type="button" 
            className="btn btn-outline" 
            onClick={fetchCertifications}
            disabled={loading}
            title="Refresh from Firestore"
          >
            <RefreshCw size={16} /> Refresh
          </button>
          {!isEditing && (
            <button className="btn btn-primary" onClick={() => { resetForm(); setIsEditing(true); }}>
              <Plus size={18} /> Add Certification
            </button>
          )}
        </div>
      </div>

      {statusMsg.text && (
        <div style={{
          padding: '12px 18px',
          borderRadius: '8px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          backgroundColor: statusMsg.type === 'error' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)',
          color: statusMsg.type === 'error' ? '#ef4444' : '#10b981',
          border: `1px solid ${statusMsg.type === 'error' ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`
        }}>
          {statusMsg.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {isEditing ? (
        <div className="card" style={{ padding: '28px', borderRadius: '16px', border: '1px solid var(--border)', marginBottom: '35px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Sparkles size={18} style={{ color: 'var(--accent)' }} />
              {currentCert ? `Edit: ${currentCert.title}` : 'Add New Certification'}
            </h3>
            <button 
              type="button" 
              onClick={resetForm} 
              className="btn btn-outline"
              style={{ padding: '6px 12px' }}
            >
              <X size={16} /> Cancel
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
              
              <div className="admin-form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Certification Title *</label>
                <input 
                  type="text" 
                  name="title" 
                  value={formData.title} 
                  onChange={handleInputChange} 
                  placeholder="e.g. Employability Skill Programme" 
                  required 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                />
              </div>

              <div className="admin-form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Organization / Issuing Body *</label>
                <input 
                  type="text" 
                  name="organization" 
                  value={formData.organization} 
                  onChange={handleInputChange} 
                  placeholder="e.g. Mahindra Pride collaboration with Nandi Foundation" 
                  required 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                />
              </div>

              <div className="admin-form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Year (Leave blank if none)</label>
                <input 
                  type="text" 
                  name="year" 
                  value={formData.year} 
                  onChange={handleInputChange} 
                  placeholder="e.g. 2023 or 2024" 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                />
              </div>

              <div className="admin-form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Display Order (1 to 4) *</label>
                <input 
                  type="number" 
                  name="order" 
                  value={formData.order} 
                  onChange={handleInputChange} 
                  min="1" 
                  max="20"
                  required 
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                />
              </div>

              <div className="admin-form-group">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Card Accent Theme</label>
                <select 
                  name="theme" 
                  value={formData.theme} 
                  onChange={handleInputChange}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
                >
                  {THEME_OPTIONS.map(opt => (
                    <option key={opt.id} value={opt.id}>{opt.label}</option>
                  ))}
                </select>
              </div>

            </div>

            <div className="admin-form-group" style={{ marginTop: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Description</label>
              <textarea 
                name="description" 
                rows="3" 
                value={formData.description} 
                onChange={handleInputChange} 
                placeholder="Brief summary of skills, competencies, or achievements recognized by this credential..."
                style={{ width: '100%', padding: '12px 14px', borderRadius: '8px', border: '1px solid var(--border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)', resize: 'vertical' }}
              />
            </div>

            {/* Cloudinary Media Management Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '25px', padding: '20px', borderRadius: '12px', background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)' }}>
              
              {/* Cover Image Upload & Live Preview */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                  <ImageIcon size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
                  Certificate Cover Image (Cloudinary)
                </label>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleCoverFileChange}
                  style={{ marginBottom: '10px', width: '100%' }}
                />
                {coverPreviewUrl ? (
                  <div style={{ marginTop: '8px' }}>
                    <p style={{ margin: '0 0 6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Live Image Preview:</p>
                    <img 
                      src={coverPreviewUrl} 
                      alt="Cover Preview" 
                      style={{ width: '100%', maxHeight: '180px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border)' }} 
                    />
                  </div>
                ) : (
                  <div style={{ padding: '20px', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: '8px', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                    No cover image uploaded yet. High-quality default visual will be used.
                  </div>
                )}
              </div>

              {/* Certificate File / Link */}
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>
                  <FileText size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
                  Actual Certificate File (Image or PDF)
                </label>
                <input 
                  type="file" 
                  accept="image/*,.pdf" 
                  onChange={(e) => setCertFile(e.target.files?.[0])}
                  style={{ marginBottom: '10px', width: '100%' }}
                />
                {currentCert?.certificateUrl && (
                  <div style={{ marginTop: '10px', padding: '10px 14px', borderRadius: '8px', background: 'rgba(0, 223, 129, 0.08)', border: '1px solid rgba(0, 223, 129, 0.2)' }}>
                    <a 
                      href={currentCert.certificateUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ color: 'var(--accent)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem' }}
                    >
                      <Eye size={15} /> Inspect Current Certificate File <ExternalLink size={13} />
                    </a>
                  </div>
                )}
                <p style={{ margin: '8px 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  Uploaded file is stored securely in Cloudinary and will open when users click "View Certificate".
                </p>
              </div>

            </div>

            <div className="admin-actions" style={{ marginTop: '30px', display: 'flex', gap: '14px' }}>
              <button type="submit" className="btn btn-primary" disabled={uploading}>
                {uploading ? 'Uploading to Cloudinary & Saving...' : 'Save Certification'}
              </button>
              <button type="button" className="btn btn-outline" onClick={resetForm} disabled={uploading}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="admin-list" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {certifications.length === 0 ? (
            <div className="card" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              <Award size={36} style={{ margin: '0 auto 12px', opacity: 0.5 }} />
              <p>No certifications found in Firestore. Click "Add Certification" or refresh.</p>
            </div>
          ) : (
            certifications.map((cert, idx) => (
              <div 
                key={cert.id || idx} 
                className="admin-list-item card" 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between', 
                  padding: '16px 20px', 
                  borderRadius: '12px',
                  border: '1px solid var(--border)',
                  flexWrap: 'wrap',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 320px' }}>
                  <div style={{ 
                    width: '34px', 
                    height: '34px', 
                    borderRadius: '8px', 
                    background: 'rgba(0, 223, 129, 0.12)', 
                    color: 'var(--accent)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontWeight: 700, 
                    fontSize: '0.85rem' 
                  }}>
                    {String(cert.order || idx + 1).padStart(2, '0')}
                  </div>

                  {cert.coverUrl ? (
                    <img 
                      src={cert.coverUrl} 
                      alt={cert.title} 
                      style={{ width: '70px', height: '48px', objectFit: 'cover', borderRadius: '6px', border: '1px solid var(--border)' }} 
                    />
                  ) : (
                    <div style={{ width: '70px', height: '48px', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: 'var(--text-secondary)', borderRadius: '6px' }}>
                      Default Img
                    </div>
                  )}

                  <div>
                    <h4 style={{ margin: '0 0 4px', color: 'var(--text-primary)', fontSize: '1.05rem', fontWeight: 600 }}>
                      {cert.title}
                    </h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {cert.organization} {cert.year ? `• ${cert.year}` : ''} | Order: {cert.order || idx + 1}
                    </span>
                    {cert.description && (
                      <p style={{ margin: '4px 0 0', fontSize: '0.8rem', color: 'var(--text-secondary)', maxWidth: '500px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {cert.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="admin-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {cert.certificateUrl && (
                    <a 
                      href={cert.certificateUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn btn-outline admin-btn-sm" 
                      title="Inspect Certificate Document"
                      style={{ padding: '6px 10px' }}
                    >
                      <Eye size={15} />
                    </a>
                  )}
                  <button 
                    onClick={() => handleEdit(cert)} 
                    className="btn btn-outline admin-btn-sm" 
                    title="Edit"
                    style={{ padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Edit2 size={15} /> Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(cert.id)} 
                    className="btn btn-outline admin-btn-sm" 
                    style={{ color: '#ff4d4f', borderColor: 'rgba(255, 77, 79, 0.3)', padding: '6px 10px' }} 
                    title="Delete"
                  >
                    <Trash2 size={15} />
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
