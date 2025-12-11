import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import Marketplace from './pages/Marketplace';
import MyCrops from './pages/MyCrops';
import StorageTips from './pages/StorageTips';
import NutritionInfo from './pages/NutritionInfo';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Profile from './pages/Profile';
import './App.css';

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard/farmer" element={<FarmerDashboard />} />
          <Route path="/dashboard/buyer" element={<BuyerDashboard />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/my-crops" element={<MyCrops />} />
          <Route path="/storage-tips" element={<StorageTips />} />
          <Route path="/nutrition" element={<NutritionInfo />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
      <footer className="app-footer">
        <p>© {new Date().getFullYear()} Farmeasee · Connecting farmers and buyers.</p>
      </footer>
    </div>
  );
}
