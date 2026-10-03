import React, { useState, useEffect } from 'react';
import { db } from '../../../services/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { Trash2, Check, Mail, ExternalLink } from 'lucide-react';

const AdminMessagesTab = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'messages'));
      const msgs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort by timestamp descending
      setMessages(msgs.sort((a, b) => {
        if (!a.timestamp) return 1;
        if (!b.timestamp) return -1;
        return b.timestamp.toMillis() - a.timestamp.toMillis();
      }));
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, 'messages', id), { read: !currentStatus });
      setMessages(messages.map(msg => msg.id === id ? { ...msg, read: !currentStatus } : msg));
    } catch (error) {
      console.error("Error updating message:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteDoc(doc(db, 'messages', id));
        setMessages(messages.filter(msg => msg.id !== id));
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    const date = timestamp.toDate();
    return date.toLocaleString();
  };

  if (loading) return <div>Loading messages...</div>;

  return (
    <div>
      <div className="admin-tab-header">
        <h2 className="admin-tab-title">Contact Messages</h2>
      </div>

      <div className="messages-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {messages.length === 0 ? (
          <div className="card">No messages found.</div>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className={`card ${!msg.read ? 'unread' : ''}`} style={{ borderLeft: !msg.read ? '4px solid var(--accent)' : '1px solid var(--border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <div>
                  <h3 style={{ margin: '0 0 5px 0', color: 'var(--text-primary)' }}>{msg.name}</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <a href={`mailto:${msg.email}`} style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem' }}>
                      <Mail size={14} /> {msg.email}
                    </a>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
                    {formatDate(msg.timestamp)}
                  </div>
                  <div className="admin-actions">
                    <button 
                      onClick={() => handleMarkRead(msg.id, msg.read)} 
                      className="btn btn-outline admin-btn-sm"
                      title={msg.read ? "Mark as unread" : "Mark as read"}
                      style={msg.read ? { borderColor: 'var(--border)', color: 'var(--text-secondary)' } : {}}
                    >
                      <Check size={16} /> {msg.read ? 'Read' : 'Mark Read'}
                    </button>
                    <button 
                      onClick={() => handleDelete(msg.id)} 
                      className="btn btn-outline admin-btn-sm" 
                      style={{ color: '#ff4d4f', borderColor: '#ff4d4f' }} 
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
              <div style={{ backgroundColor: 'var(--bg-primary)', padding: '15px', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)', whiteSpace: 'pre-wrap' }}>
                {msg.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminMessagesTab;
