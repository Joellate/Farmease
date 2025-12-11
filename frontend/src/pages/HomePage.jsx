import { Link } from 'react-router-dom';
import '../styles/HomePage.css';

export default function HomePage() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Farmeasee</h1>
          <p className="hero-subtitle">
            Connecting farmers and buyers. Fresh produce, fair prices, straight from the farm.
          </p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">
              Get Started
            </Link>
            <Link to="/marketplace" className="btn btn-secondary">
              Browse Marketplace
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="placeholder-image">🌾</div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Farmeasee?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚜</div>
            <h3>Direct from Farmers</h3>
            <p>Buy fresh produce directly from local farmers, ensuring quality and supporting rural communities.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Fair Prices</h3>
            <p>Get the best prices without middlemen. Farmers earn more, buyers save money.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌱</div>
            <h3>Fresh & Organic</h3>
            <p>Support sustainable farming practices and enjoy fresh, pesticide-free produce.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Easy Logistics</h3>
            <p>Hassle-free delivery right to your doorstep. Track your orders in real-time.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Storage Tips</h3>
            <p>Learn how to store and preserve your produce to keep it fresh longer.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🥗</div>
            <h3>Nutrition Info</h3>
            <p>Get detailed nutritional information about every product you purchase.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <h2>Ready to Start?</h2>
        <p>Join thousands of farmers and buyers already using Farmeasee.</p>
        <div className="cta-buttons">
          <Link to="/register" className="btn btn-primary-large">
            Sign Up as a Farmer
          </Link>
          <Link to="/register" className="btn btn-secondary-large">
            Sign Up as a Buyer
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stat-item">
          <h3>5,000+</h3>
          <p>Active Farmers</p>
        </div>
        <div className="stat-item">
          <h3>50,000+</h3>
          <p>Happy Customers</p>
        </div>
        <div className="stat-item">
          <h3>1,000+</h3>
          <p>Products Available</p>
        </div>
        <div className="stat-item">
          <h3>$5M+</h3>
          <p>Transactions</p>
        </div>
      </section>
    </div>
  );
}
