import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/client';
import { sampleFarmers, sampleBuyers } from '../utils/sampleData';
import '../styles/RegisterPage.css';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
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
    setLoading(true);

    try {
      const res = await api.post('/auth/login', form);
      const { token, user } = res.data;
      if (token) localStorage.setItem('token', token);
      if (user) localStorage.setItem('user', JSON.stringify(user));
      // notify other components (Navbar) that the user changed
      try {
        window.dispatchEvent(new CustomEvent('userChanged', { detail: { user } }));
      } catch (e) {
        // older browsers fallback
        window.dispatchEvent(new Event('userChanged'));
      }
      // Redirect based on user type
      const userType = user?.userType || 'buyer';
      if (userType === 'farmer') {
        navigate('/dashboard/farmer');
      } else {
        navigate('/dashboard/buyer');
      }
    } catch (err) {
      const msg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        'Login failed.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <h1 className="page-title">Welcome back</h1>
        <p className="page-subtitle">
          Log in to manage your crops and connect with buyers.
        </p>

        <form className="form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              className="form-input"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

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

          {error && <p className="text-error">{error}</p>}

          <button className="btn btn-primary w-full" disabled={loading}>
            {loading ? 'Logging in…' : 'Login'}
          </button>
        </form>

        <p className="auth-footnote">
          Don't have an account?{' '}
          <Link to="/register" className="link">
            Sign up
          </Link>
        </p>

        {/* Test Credentials Section */}
        <div className="test-credentials">
          <h3>🧪 Test Credentials</h3>
          <div className="credentials-group">
            <h4>Farmer Accounts</h4>
            {sampleFarmers.slice(0, 2).map((farmer) => (
              <div key={farmer.id} className="credential-item">
                <small>
                  <strong>{farmer.name}:</strong> {farmer.email} / password123
                </small>
              </div>
            ))}
          </div>
          <div className="credentials-group">
            <h4>Buyer Accounts</h4>
            {sampleBuyers.slice(0, 2).map((buyer) => (
              <div key={buyer.id} className="credential-item">
                <small>
                  <strong>{buyer.name}:</strong> {buyer.email} / password123
                </small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
