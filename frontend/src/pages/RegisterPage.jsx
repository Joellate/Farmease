import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/client';
import '../styles/RegisterPage.css';

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'buyer',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: form.name,
        email: form.email,
        password: form.password,
        userType: form.userType,
        // only include phone if provided (farmers)
        phone: form.phone || undefined,
      };
      await api.post('/auth/signup', payload);
      navigate('/login');
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Registration failed.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h1 className="page-title">Create your account</h1>
        <p className="page-subtitle">
          Join Farmeasee and connect with our community.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Account type</label>
            <div className="user-type-selector">
              <label className="radio-option">
                <input
                  type="radio"
                  name="userType"
                  value="buyer"
                  checked={form.userType === 'buyer'}
                  onChange={handleChange}
                />
                <span className="radio-label">🛒 Buyer</span>
                <span className="radio-desc">Browse and purchase fresh produce</span>
              </label>
              <label className="radio-option">
                <input
                  type="radio"
                  name="userType"
                  value="farmer"
                  checked={form.userType === 'farmer'}
                  onChange={handleChange}
                />
                <span className="radio-label">🚜 Farmer</span>
                <span className="radio-desc">List and sell your crops</span>
              </label>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              name="name"
              className="form-input"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {form.userType === 'farmer' && (
            <div className="form-group">
              <label className="form-label" htmlFor="phone">Phone number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="form-input"
                value={form.phone}
                onChange={handleChange}
                placeholder="+250 7XX XXX XXX"
              />
              <small className="form-note">Buyers will use this to contact you.</small>
            </div>
          )}

          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="form-input"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="form-input"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="confirmPassword">
                Confirm password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="form-input"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {error && <p className="text-error">{error}</p>}

          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Creating account…' : 'Sign up'}
          </button>
        </form>

        <p className="auth-footnote">
          Already have an account?{' '}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
