import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'; 

export default function Navbar() {
  const [isAuthed, setIsAuthed] = useState(false);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setUserType(parsedUser.userType || 'buyer');
        setIsAuthed(true);
      } catch (e) {
        console.error('Failed to parse user data:', e);
        setIsAuthed(false);
      }
    } else {
      setIsAuthed(false);
    }
  }, []);

  // Listen for user changes (login/logout) and update Navbar state
  useEffect(() => {
    const handler = (e) => {
      const userData = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setUserType(parsedUser.userType || parsedUser.user_type || 'buyer');
          setIsAuthed(true);
        } catch (err) {
          console.error('Navbar userChanged parse error', err);
          setIsAuthed(false);
          setUser(null);
          setUserType(null);
        }
      } else {
        setIsAuthed(false);
        setUser(null);
        setUserType(null);
      }
    };

    window.addEventListener('userChanged', handler);
    return () => window.removeEventListener('userChanged', handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');  
    setIsAuthed(false);
    setUser(null);
    setUserType(null);
    navigate('/');
  };

  const handleDashboardClick = (e) => {
    e.preventDefault();
    if (userType === 'farmer') {
      navigate('/dashboard/farmer');
    } else {
      navigate('/dashboard/buyer');
    }
  };

  const linkClass = ({ isActive }) =>
    'nav-link' + (isActive ? ' nav-link-active' : '');

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="nav-logo">
          <span className="logo-dot" />
          <span>Farmeasee</span>
        </Link>

        <nav className="nav-links">
          {isAuthed && (
            <a href="#dashboard" onClick={handleDashboardClick} className="nav-link">
              {userType === 'farmer' ? '🚜 Dashboard' : '🛒 Dashboard'}
            </a>
          )}
          <NavLink to="/marketplace" className={linkClass}>
            Marketplace
          </NavLink>
          {userType === 'farmer' && (
            <NavLink to="/my-crops" className={linkClass}>
              My Crops
            </NavLink>
          )}
          <NavLink to="/storage-tips" className={linkClass}>
            Storage Tips
          </NavLink>
          <NavLink to="/nutrition" className={linkClass}>
            Nutrition
          </NavLink>
        </nav>

        <div className="nav-actions">
          {isAuthed ? (
            <div className="user-menu">
              <span className="user-name">
                {user?.name || 'User'} {userType === 'farmer' ? '🚜' : '🛒'}
              </span>
              <NavLink to="/profile" className={linkClass} style={{ marginRight: 8 }}>
                Profile
              </NavLink>
              <button className="btn btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
