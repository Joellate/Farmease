import { useEffect, useState } from 'react';
import api from '../api/client';

export default function CropFeed() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCrops = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await api.get('/crops');
      setCrops(res.data || []);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          'Failed to load crops.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  if (loading) return <p>Loading crops…</p>;
  if (error) return <p className="text-error">{error}</p>;

  if (!crops.length) {
    return <p>No crops available yet.</p>;
  }

  return (
    <div className="crop-grid">
      {crops.map((crop) => (
        <article key={crop.id} className="card crop-card">
          <header className="card-header">
            <h3 className="card-title">{crop.title}</h3>
            {crop.price != null && (
              <span className="badge">
                {Number(crop.price).toLocaleString()} RWF
              </span>
            )}
          </header>

          {crop.description && (
            <p className="card-body">{crop.description}</p>
          )}

          <dl className="card-meta">
            <div>
              <dt>Quantity</dt>
              <dd>{crop.quantity || '—'}</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>{crop.location || '—'}</dd>
            </div>
          </dl>

          <footer className="card-footer">
            <div className="farmer-info">
              <strong>Farmer</strong>
              <p>{crop.farmer_name || 'Unknown farmer'}</p>
              {crop.farmer_email && (
                <a href={`mailto:${crop.farmer_email}`}>
                  Contact: {crop.farmer_email}
                </a>
              )}
            </div>
          </footer>
        </article>
      ))}
    </div>
  );
}
