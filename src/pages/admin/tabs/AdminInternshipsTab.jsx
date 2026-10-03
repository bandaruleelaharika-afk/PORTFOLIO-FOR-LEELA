import React, { useState, useEffect } from 'react';
import { db } from '../../../services/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

const AdminInternshipsTab = () => {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    company: '', location: '', year: '', role: '', description: '', order: 0
  });

  const fetchInternships = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'internships'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort((a, b) => a.order - b.order);
      setInternships(data);
    } catch (error) {
      console.error("Error fetching internships:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (internship) => {
    setEditingId(internship.id);
    setFormData(internship);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this internship?")) {
      await deleteDoc(doc(db, 'internships', id));
      fetchInternships();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idToSave = editingId || `int_${Date.now()}`;
    await setDoc(doc(db, 'internships', idToSave), {
      ...formData,
      order: Number(formData.order)
    });
    setEditingId(null);
    setFormData({ company: '', location: '', year: '', role: '', description: '', order: 0 });
    fetchInternships();
  };

  return (
    <div>
      <h2 className="admin-tab-title">Manage Internships</h2>
      
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3>{editingId ? 'Edit Internship' : 'Add New Internship'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Company</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} required />
          </div>
          <div className="admin-form-group">
            <label>Role</label>
            <input type="text" name="role" value={formData.role} onChange={handleChange} required />
          </div>
          <div className="admin-form-group">
            <label>Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />
          </div>
          <div className="admin-form-group">
            <label>Year</label>
            <input type="text" name="year" value={formData.year} onChange={handleChange} required />
          </div>
          <div className="admin-form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="3" required></textarea>
          </div>
          <div className="admin-form-group">
            <label>Display Order</label>
            <input type="number" name="order" value={formData.order} onChange={handleChange} required />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn btn-primary">{editingId ? 'Save Changes' : 'Add Internship'}</button>
            {editingId && (
              <button type="button" className="btn btn-outline" onClick={() => { setEditingId(null); setFormData({ company: '', location: '', year: '', role: '', description: '', order: 0 }); }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-list">
        {loading ? <p>Loading internships...</p> : internships.map(internship => (
          <div key={internship.id} className="admin-list-item card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: '0 0 5px 0' }}>{internship.company} - {internship.role}</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{internship.year} | {internship.location}</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleEdit(internship)} className="btn btn-outline" style={{ padding: '5px 10px' }}>Edit</button>
              <button onClick={() => handleDelete(internship.id)} className="btn btn-primary" style={{ padding: '5px 10px', backgroundColor: '#ef4444' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminInternshipsTab;
