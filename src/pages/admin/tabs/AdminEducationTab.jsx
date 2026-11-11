import React, { useState, useEffect } from 'react';
import { db } from '../../../services/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { uploadToCloudinary } from '../../../services/cloudinary';
import { 
  GraduationCap, Plus, Edit2, Trash2, Upload, 
  Image as ImageIcon, CheckCircle2, AlertCircle, RefreshCw 
} from 'lucide-react';

import defaultStudyLabImg from '../../../assets/edu_study_lab.jpg';
import defaultCampusLibraryImg from '../../../assets/edu_campus_library.jpg';

const AdminEducationTab = () => {
  const [educationList, setEducationList] = useState([]);
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  // Form state for Education Entry CRUD
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    course: '',
    college: '',
    location: '',
    year: '',
    percentage: '',
    description: '',
    order: 1
  });

  // Image Upload state for Cloudinary
  const [imageOneFile, setImageOneFile] = useState(null);
  const [imageTwoFile, setImageTwoFile] = useState(null);
  const [imageOnePreview, setImageOnePreview] = useState(null);
  const [imageTwoPreview, setImageTwoPreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Education Milestones
      const eduSnap = await getDocs(collection(db, 'education'));
      const eduData = eduSnap.docs
        .map(d => ({ id: d.id, ...d.data() }))
        .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
      setEducationList(eduData);

      // 2. Fetch Settings for Education Showcase Images
      const settingsSnap = await getDocs(collection(db, 'settings'));
      if (!settingsSnap.empty) {
        const sData = settingsSnap.docs[0].data();
        setSettings(sData);
        setImageOnePreview(sData.educationImageOne || defaultStudyLabImg);
        setImageTwoPreview(sData.educationImageTwo || defaultCampusLibraryImg);
      } else {
        setImageOnePreview(defaultStudyLabImg);
        setImageTwoPreview(defaultCampusLibraryImg);
      }
    } catch (err) {
      console.error('Error fetching education data:', err);
      setStatusMsg({ type: 'error', text: 'Failed to fetch education records from Firestore.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'order' ? Number(value) : value
    }));
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      course: item.course || '',
      college: item.college || '',
      location: item.location || '',
      year: item.year || '',
      percentage: item.percentage || '',
      description: item.description || '',
      order: Number(item.order) || 1
    });
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      course: '',
      college: '',
      location: '',
      year: '',
      percentage: '',
      description: '',
      order: educationList.length + 1
    });
  };

  const handleSaveEducation = async (e) => {
    e.preventDefault();
    setStatusMsg({ type: '', text: '' });
    try {
      const docId = editingId || `edu_${Date.now()}`;
      await setDoc(doc(db, 'education', docId), {
        ...formData,
        order: Number(formData.order) || 1
      });

      setStatusMsg({
        type: 'success',
        text: editingId ? 'Education milestone updated successfully!' : 'New education milestone added successfully!'
      });
      handleCancelEdit();
      fetchData();
    } catch (err) {
      console.error('Error saving education:', err);
      setStatusMsg({ type: 'error', text: 'Error saving education milestone to Firestore.' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this education entry?')) return;
    try {
      await deleteDoc(doc(db, 'education', id));
      setStatusMsg({ type: 'success', text: 'Education milestone deleted successfully.' });
      fetchData();
    } catch (err) {
      console.error('Error deleting education:', err);
      setStatusMsg({ type: 'error', text: 'Failed to delete education entry.' });
    }
  };

  // Image Selection Handlers
  const handleImageOneChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageOneFile(file);
      setImageOnePreview(URL.createObjectURL(file));
    }
  };

  const handleImageTwoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageTwoFile(file);
      setImageTwoPreview(URL.createObjectURL(file));
    }
  };

  // Upload Images to Cloudinary and update Firestore settings
  const handleUploadImages = async () => {
    if (!imageOneFile && !imageTwoFile) {
      alert('Please choose at least one image file to upload.');
      return;
    }

    setUploadingImage(true);
    setStatusMsg({ type: '', text: '' });

    try {
      let updatedImageOneUrl = settings.educationImageOne || '';
      let updatedImageTwoUrl = settings.educationImageTwo || '';

      if (imageOneFile) {
        const res1 = await uploadToCloudinary(imageOneFile);
        updatedImageOneUrl = res1.url;
      }

      if (imageTwoFile) {
        const res2 = await uploadToCloudinary(imageTwoFile);
        updatedImageTwoUrl = res2.url;
      }

      // Save Cloudinary image URLs into Firestore settings
      await setDoc(doc(db, 'settings', 'siteSettings'), {
        ...settings,
        educationImageOne: updatedImageOneUrl,
        educationImageTwo: updatedImageTwoUrl
      }, { merge: true });

      setStatusMsg({ type: 'success', text: 'Showcase images uploaded to Cloudinary & saved to Firestore!' });
      setImageOneFile(null);
      setImageTwoFile(null);
      fetchData();
    } catch (err) {
      console.error('Cloudinary upload error:', err);
      setStatusMsg({ type: 'error', text: 'Cloudinary upload failed. Please verify internet and credentials.' });
    } finally {
      setUploadingImage(false);
    }
  };

  if (loading) {
    return <div className="admin-loading"><p>Loading education records...</p></div>;
  }

  return (
    <div className="admin-tab-container">
      <div className="admin-tab-header">
        <h2 className="admin-tab-title">
          <GraduationCap className="inline-icon" /> Manage Education Section
        </h2>
        <p className="admin-tab-subtitle">
          Manage your chronological academic milestones (Intermediate → Degree → MCA) and staggered showcase images.
        </p>
      </div>

      {statusMsg.text && (
        <div className={`admin-alert ${statusMsg.type === 'error' ? 'alert-error' : 'alert-success'}`}>
          {statusMsg.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
          <span>{statusMsg.text}</span>
        </div>
      )}

      {/* 1. Staggered Left-Side Education Images Upload (Cloudinary) */}
      <div className="card admin-section-card" style={{ marginBottom: '35px' }}>
        <h3 className="admin-card-title">
          <ImageIcon size={20} className="inline-icon" /> Staggered Showcase Photography
        </h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
          Upload or replace the two left-side editorial showcase photos. Images are hosted on Cloudinary.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginBottom: '20px' }}>
          {/* Panel 1 */}
          <div className="image-uploader-box card" style={{ padding: '16px', textAlign: 'center' }}>
            <span style={{ fontWeight: '700', fontSize: '0.9rem', display: 'block', marginBottom: '10px' }}>
              Image 1: Software / AI Lab
            </span>
            <div style={{ width: '100%', height: '170px', borderRadius: '16px', overflow: 'hidden', marginBottom: '12px', background: 'var(--bg-tertiary)' }}>
              <img 
                src={imageOnePreview} 
                alt="Panel 1 preview" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageOneChange}
              style={{ fontSize: '0.85rem' }} 
            />
          </div>

          {/* Panel 2 */}
          <div className="image-uploader-box card" style={{ padding: '16px', textAlign: 'center' }}>
            <span style={{ fontWeight: '700', fontSize: '0.9rem', display: 'block', marginBottom: '10px' }}>
              Image 2: University Campus / Library
            </span>
            <div style={{ width: '100%', height: '170px', borderRadius: '16px', overflow: 'hidden', marginBottom: '12px', background: 'var(--bg-tertiary)' }}>
              <img 
                src={imageTwoPreview} 
                alt="Panel 2 preview" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageTwoChange}
              style={{ fontSize: '0.85rem' }} 
            />
          </div>
        </div>

        <button 
          onClick={handleUploadImages} 
          disabled={uploadingImage || (!imageOneFile && !imageTwoFile)}
          className="btn btn-primary"
        >
          {uploadingImage ? <RefreshCw className="spin" size={16} /> : <Upload size={16} />}
          <span>{uploadingImage ? 'Uploading to Cloudinary...' : 'Upload & Save Images'}</span>
        </button>
      </div>

      {/* 2. Add / Edit Education Milestone Form */}
      <div className="card admin-section-card" style={{ marginBottom: '35px' }}>
        <h3 className="admin-card-title">
          {editingId ? <Edit2 size={20} className="inline-icon" /> : <Plus size={20} className="inline-icon" />}
          {editingId ? 'Edit Education Milestone' : 'Add New Academic Milestone'}
        </h3>

        <form onSubmit={handleSaveEducation} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginTop: '15px' }}>
          <div className="admin-form-group">
            <label>Qualification / Course Title *</label>
            <input 
              type="text" 
              name="course" 
              value={formData.course} 
              onChange={handleInputChange} 
              placeholder="e.g. Intermediate (MPC)" 
              required 
            />
          </div>

          <div className="admin-form-group">
            <label>College / Institution Name *</label>
            <input 
              type="text" 
              name="college" 
              value={formData.college} 
              onChange={handleInputChange} 
              placeholder="e.g. Sri Chaitanya Junior College" 
              required 
            />
          </div>

          <div className="admin-form-group">
            <label>Location *</label>
            <input 
              type="text" 
              name="location" 
              value={formData.location} 
              onChange={handleInputChange} 
              placeholder="e.g. Kakinada, Andhra Pradesh" 
              required 
            />
          </div>

          <div className="admin-form-group">
            <label>Year / Duration *</label>
            <input 
              type="text" 
              name="year" 
              value={formData.year} 
              onChange={handleInputChange} 
              placeholder="e.g. 2019–2021" 
              required 
            />
          </div>

          <div className="admin-form-group">
            <label>Academic Result / Percentage *</label>
            <input 
              type="text" 
              name="percentage" 
              value={formData.percentage} 
              onChange={handleInputChange} 
              placeholder="e.g. 85%" 
              required 
            />
          </div>

          <div className="admin-form-group">
            <label>Chronological Display Order *</label>
            <input 
              type="number" 
              name="order" 
              value={formData.order} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Supporting Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleInputChange} 
              rows="3" 
              placeholder="e.g. Completed Intermediate education with Mathematics, Physics and Chemistry."
            />
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '12px' }}>
            <button type="submit" className="btn btn-primary">
              {editingId ? 'Save Changes' : 'Add Milestone'}
            </button>
            {editingId && (
              <button type="button" onClick={handleCancelEdit} className="btn btn-outline">
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* 3. Existing Milestones List */}
      <div className="card admin-section-card">
        <h3 className="admin-card-title">Existing Education Milestones</h3>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
          Sorted in chronological display order: Intermediate → Degree → MCA
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {educationList.map((item, idx) => (
            <div 
              key={item.id} 
              className="card" 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '18px 24px',
                borderLeft: '4px solid var(--accent)'
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--accent)', background: 'var(--accent-transparent)', padding: '2px 8px', borderRadius: '4px' }}>
                    #{item.order} • {item.year}
                  </span>
                  <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    Score: {item.percentage}
                  </span>
                </div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.2rem', color: 'var(--text-primary)' }}>
                  {item.course}
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  {item.college} • {item.location}
                </p>
                {item.description && (
                  <p style={{ margin: '6px 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {item.description}
                  </p>
                )}
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => handleEdit(item)} 
                  className="btn btn-outline" 
                  style={{ padding: '6px 14px', fontSize: '0.85rem' }}
                >
                  <Edit2 size={14} /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(item.id)} 
                  className="btn btn-primary" 
                  style={{ padding: '6px 14px', fontSize: '0.85rem', backgroundColor: '#ef4444', borderColor: '#ef4444' }}
                >
                  <Trash2 size={14} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminEducationTab;

