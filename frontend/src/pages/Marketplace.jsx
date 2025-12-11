import { useEffect, useState } from 'react';
import api from '../api/client';
import CropCard from '../components/CropCard';

export default function Marketplace() {
  const [crops, setCrops] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        setError('');
        const res = await api.get('/crops');
        const data = res.data || [];
        setCrops(data);
        setFiltered(data);
      } catch (err) {
        console.error('Error loading crops', err);
        const msg =
          err.response?.data?.error ||
          err.response?.data?.message ||
          'Could not load crops.';
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchCrops();
  }, []);

  useEffect(() => {
    if (!query) {
      setFiltered(crops);
      return;
    }
    const q = query.toLowerCase();
    setFiltered(
      crops.filter(
        (c) =>
          c.title?.toLowerCase().includes(q) ||
          c.location?.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q)
      )
    );
  }, [query, crops]);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Marketplace</h1>
          <p className="page-subtitle">
            Browse fresh produce from farmers and reach out directly.
          </p>
        </div>
        <div className="page-header-actions">
          <input
            className="input search-input"
            placeholder="Search by crop, location, or description..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {loading && <p>Loading crops…</p>}
      {error && !loading && <p className="text-error">{error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <p className="text-muted">No crops found. Try a different search.</p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="crop-grid">
          {filtered.map((crop) => (
            <CropCard key={crop.id} crop={crop} />
          ))}
        </div>
      )}
    </div>
  );
}
