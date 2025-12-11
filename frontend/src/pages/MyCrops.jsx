// src/pages/MyCrops.jsx
import { useEffect, useState } from 'react';
import api from '../api/client';
import CropCard from '../components/CropCard';

export default function MyCrops() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyCrops = async () => {
      try {
        setError('');
        const res = await api.get('/crops/mine');
        setCrops(res.data || []);
      } catch (err) {
        console.error('Error loading my crops', err);
        const msg =
          err.response?.data?.error ||
          err.response?.data?.message ||
          'Could not load your crops.';
        setError(msg);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCrops();
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Crops</h1>
          <p className="page-subtitle">
            All the crops you’ve listed on Farmeasee.
          </p>
        </div>
      </div>

      {loading && <p>Loading your crops…</p>}
      {error && !loading && <p className="text-error">{error}</p>}

      {!loading && !error && crops.length === 0 && (
        <p className="text-muted">
          You haven’t listed any crops yet. Go to the Dashboard to add one.
        </p>
      )}

      {!loading && !error && crops.length > 0 && (
        <div className="crop-grid">
          {crops.map((crop) => (
            <CropCard key={crop.id} crop={crop} />
          ))}
        </div>
      )}
    </div>
  );
}
