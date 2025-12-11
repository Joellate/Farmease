import { useState, useEffect } from 'react';
import CropForm from '../components/CropForm';
import CropFeed from './CropFeed';
import '../styles/Dashboard.css';

export default function FarmerDashboard() {
  const [stats, setStats] = useState({
    totalCrops: 0,
    activeListing: 0,
    totalSales: 0,
  });

  useEffect(() => {
    // TODO: Fetch farmer stats from API
    setStats({
      totalCrops: 12,
      activeListing: 8,
      totalSales: 4500,
    });
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Farmer Dashboard</h1>
          <p className="page-subtitle">
            Manage your crops and monitor your sales.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.totalCrops}</div>
          <div className="stat-label">Total Crops</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.activeListing}</div>
          <div className="stat-label">Active Listings</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">${stats.totalSales}</div>
          <div className="stat-label">Total Sales</div>
        </div>
      </div>

      <div className="page-grid">
        <section className="card card-elevated">
          <h2 className="section-title">📦 Add a new crop</h2>
          <p className="section-description">List your crops and reach buyers across the marketplace</p>
          <CropForm />
        </section>

        <section className="card card-elevated">
          <h2 className="section-title">📊 Your crop listings</h2>
          <p className="section-description">Monitor your active and past listings</p>
          <CropFeed />
        </section>
      </div>
    </div>
  );
}
