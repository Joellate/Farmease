import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CropFeed from './CropFeed';
import '../styles/Dashboard.css';

export default function BuyerDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    savedItems: 0,
  });

  useEffect(() => {
    // TODO: Fetch buyer stats from API
    setStats({
      totalOrders: 8,
      totalSpent: 2450,
      savedItems: 15,
    });
  }, []);

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Buyer Dashboard</h1>
          <p className="page-subtitle">
            Browse fresh produce, track orders, and discover local farmers.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-number">{stats.totalOrders}</div>
          <div className="stat-label">Orders Placed</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">${stats.totalSpent}</div>
          <div className="stat-label">Total Spent</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.savedItems}</div>
          <div className="stat-label">Saved Items</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/marketplace" className="action-btn action-primary">
          <span className="action-icon">🛒</span>
          <span>Browse Marketplace</span>
        </Link>
        <Link to="/storage-tips" className="action-btn action-secondary">
          <span className="action-icon">📚</span>
          <span>Storage Tips</span>
        </Link>
        <Link to="/nutrition" className="action-btn action-secondary">
          <span className="action-icon">🥗</span>
          <span>Nutrition Info</span>
        </Link>
      </div>

      <div className="page-grid">
        <section className="card card-elevated">
          <h2 className="section-title">🌾 Fresh produce near you</h2>
          <p className="section-description">Browse the latest crops from local farmers</p>
          <CropFeed />
        </section>

        {/* Messages removed per request: buyers will see farmer contact numbers on listings only */}
      </div>
    </div>
  );
}
