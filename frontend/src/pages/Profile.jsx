import { useEffect, useState } from 'react';
import apiClient from '../api/client';
import '../styles/RegisterPage.css';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '' });

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await apiClient.get('/users/me');
        setProfile(res.data);
        setForm({ name: res.data.name || '', phone: res.data.phone || '' });
      } catch (err) {
        console.error('load profile error', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await apiClient.put('/users/me', { name: form.name, phone: form.phone });
      setProfile(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
      window.dispatchEvent(new Event('userChanged'));
    } catch (err) {
      console.error('save profile error', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: 20 }}>Loading profile…</div>;

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h1 className="page-title">Your profile</h1>
        <form className="form" onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Full name</label>
            <input name="name" value={form.name} onChange={handleChange} className="form-input" />
          </div>

          <div className="form-group">
            <label className="form-label">Phone</label>
            <input name="phone" value={form.phone} onChange={handleChange} className="form-input" />
            <small className="form-note">Buyers will see this on your listings.</small>
          </div>

          <button className="btn btn-primary w-full" disabled={saving}>
            {saving ? 'Saving…' : 'Save profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
