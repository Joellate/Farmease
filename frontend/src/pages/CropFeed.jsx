import React, { useEffect, useState } from 'react';
import apiClient from '../api/client';
import CropCard from '../components/CropCard';
import { getAllCrops } from '../utils/sampleData';

const CropFeed = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCrops = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/crops');
      setCrops(res.data);
    } catch (err) {
      console.warn('Failed to fetch crops from API, using sample data:', err);
      // Use sample data for testing if API fails
      setCrops(getAllCrops());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrops();
  }, []);

  if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading crops...</div>;
  if (error) return <div style={{ padding: '20px', color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      {crops.length === 0 ? (
        <p>No crops available yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {crops.map((c) => (
            <CropCard key={c.id} crop={c} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CropFeed;
