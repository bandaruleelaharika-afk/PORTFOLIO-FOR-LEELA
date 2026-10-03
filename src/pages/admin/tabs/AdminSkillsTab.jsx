import React, { useState, useEffect } from 'react';
import { db } from '../../../services/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';

const AdminSkillsTab = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '', category: 'Technical', order: 0
  });

  const categories = ['Technical', 'Tools & Software', 'Professional'];

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'skills'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).sort((a, b) => a.order - b.order);
      setSkills(data);
    } catch (error) {
      console.error("Error fetching skills:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (skill) => {
    setEditingId(skill.id);
    setFormData(skill);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      await deleteDoc(doc(db, 'skills', id));
      fetchSkills();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const idToSave = editingId || `sk_${Date.now()}`;
    await setDoc(doc(db, 'skills', idToSave), {
      ...formData,
      order: Number(formData.order)
    });
    setEditingId(null);
    setFormData({ name: '', category: 'Technical', order: 0 });
    fetchSkills();
  };

  return (
    <div>
      <h2 className="admin-tab-title">Manage Skills</h2>
      
      <div className="card" style={{ marginBottom: '30px' }}>
        <h3>{editingId ? 'Edit Skill' : 'Add New Skill'}</h3>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label>Skill Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="admin-form-group">
            <label>Category</label>
            <select name="category" value={formData.category} onChange={handleChange} required style={{ width: '100%', padding: '10px', backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}>
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="admin-form-group">
            <label>Display Order</label>
            <input type="number" name="order" value={formData.order} onChange={handleChange} required />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" className="btn btn-primary">{editingId ? 'Save Changes' : 'Add Skill'}</button>
            {editingId && (
              <button type="button" className="btn btn-outline" onClick={() => { setEditingId(null); setFormData({ name: '', category: 'Technical', order: 0 }); }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div className="admin-list">
        {loading ? <p>Loading skills...</p> : skills.map(skill => (
          <div key={skill.id} className="admin-list-item card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h4 style={{ margin: '0 0 5px 0' }}>{skill.name}</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--accent)' }}>{skill.category} | Order: {skill.order}</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => handleEdit(skill)} className="btn btn-outline" style={{ padding: '5px 10px' }}>Edit</button>
              <button onClick={() => handleDelete(skill.id)} className="btn btn-primary" style={{ padding: '5px 10px', backgroundColor: '#ef4444' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSkillsTab;
