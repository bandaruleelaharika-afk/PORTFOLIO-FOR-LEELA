import React, { useState, useEffect } from 'react';
import { db } from '../../../services/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { uploadToCloudinary } from '../../../services/cloudinary';
import { Edit2, Trash2, Plus, Image as ImageIcon } from 'lucide-react';

const AdminProjectsTab = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', projectUrl: '', githubUrl: '', order: 0
  });
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'projects'));
      const projs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProjects(projs.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'order' ? Number(value) : value });
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', projectUrl: '', githubUrl: '', order: projects.length + 1 });
    setImageFile(null);
    setIsEditing(false);
    setCurrentProject(null);
  };

  const handleEdit = (project) => {
    setIsEditing(true);
    setCurrentProject(project);
    setFormData({
      title: project.title || '',
      description: project.description || '',
      projectUrl: project.projectUrl || '',
      githubUrl: project.githubUrl || '',
      order: project.order || 0
    });
    setImageFile(null);
    window.scrollTo(0, 0);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteDoc(doc(db, 'projects', id));
        fetchProjects();
        setMessage('Project deleted successfully.');
      } catch (error) {
        console.error("Error deleting project:", error);
        setMessage('Error deleting project.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    setMessage('');

    try {
      let imageUrl = currentProject?.imageUrl || '';

      if (imageFile) {
        const imageRes = await uploadToCloudinary(imageFile);
        imageUrl = imageRes.url;
      }

      const projectData = {
        ...formData,
        imageUrl
      };

      if (isEditing && currentProject) {
        await updateDoc(doc(db, 'projects', currentProject.id), projectData);
        setMessage('Project updated successfully.');
      } else {
        await addDoc(collection(db, 'projects'), projectData);
        setMessage('Project added successfully.');
      }

      resetForm();
      fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
      setMessage('Error saving project.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="admin-tab-header">
        <h2 className="admin-tab-title">Manage Projects</h2>
        {!isEditing && (
          <button className="btn btn-primary" onClick={() => { resetForm(); setIsEditing(true); }}>
            <Plus size={18} /> Add Project
          </button>
        )}
      </div>

      {message && <div style={{ padding: '10px', backgroundColor: 'var(--bg-tertiary)', marginBottom: '20px', color: 'var(--accent)' }}>{message}</div>}

      {isEditing ? (
        <div className="card">
          <h3>{currentProject ? 'Edit Project' : 'Add New Project'}</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
            <div className="admin-form-group">
              <label>Project Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleInputChange} required />
            </div>
            <div className="admin-form-group">
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows="4" required />
            </div>
            <div className="admin-form-group">
              <label>Project URL (Optional)</label>
              <input type="url" name="projectUrl" value={formData.projectUrl} onChange={handleInputChange} />
            </div>
            <div className="admin-form-group">
              <label>GitHub URL (Optional)</label>
              <input type="url" name="githubUrl" value={formData.githubUrl} onChange={handleInputChange} />
            </div>
            <div className="admin-form-group">
              <label>Display Order</label>
              <input type="number" name="order" value={formData.order} onChange={handleInputChange} />
            </div>
            
            <div className="admin-form-group">
              <label><ImageIcon size={16} style={{display:'inline', verticalAlign:'middle'}}/> Project Image</label>
              <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} />
              {currentProject?.imageUrl && !imageFile && (
                <img src={currentProject.imageUrl} alt="Project Preview" className="admin-image-preview" />
              )}
            </div>

            <div className="admin-actions" style={{ marginTop: '30px' }}>
              <button type="submit" className="btn btn-primary" disabled={uploading}>
                {uploading ? 'Saving...' : 'Save Project'}
              </button>
              <button type="button" className="btn btn-outline" onClick={resetForm} disabled={uploading}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="admin-list">
          {projects.length === 0 ? (
            <p>No projects found.</p>
          ) : (
            projects.map(project => (
              <div key={project.id} className="admin-list-item">
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt="Project" style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                  ) : (
                    <div style={{ width: '60px', height: '40px', backgroundColor: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>No Img</div>
                  )}
                  <div>
                    <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>{project.title}</h4>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Order: {project.order}</span>
                  </div>
                </div>
                <div className="admin-actions">
                  <button onClick={() => handleEdit(project)} className="btn btn-outline admin-btn-sm" title="Edit">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="btn btn-outline admin-btn-sm" style={{ color: '#ff4d4f', borderColor: '#ff4d4f' }} title="Delete">
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

export default AdminProjectsTab;
