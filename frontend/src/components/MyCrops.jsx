import { useEffect, useState } from 'react';
import api from '../api/client';

export default function MyCrops() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMyCrops = async () => {
    setError('');
    setLoading(true);
    try {
      const res = await api.get('/crops/mine');
      setCrops(res.data || []);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          err.response?.data?.message ||
          'Failed to load your crops.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyCrops();
  }, []);

  if (loading) return <p>Loading your crops…</p>;
  if (error) return <p className="text-error">{error}</p>;

  if (!crops.length) {
    return <p>You have not posted any crops yet.</p>;
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
              <strong>Farmer (you)</strong>
            </div>
          </footer>
        </article>
      ))}
    </div>
  );
}
