import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <Link className="brand" to="/">
          <span className="brand-mark">AR</span>
          <span>
            BuildVision <span className="accent">AR</span>
          </span>
        </Link>

        <button
          type="button"
          className="menu-toggle"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>

        <nav className={`nav-links ${mobileOpen ? "nav-links-open" : ""}`}>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About Us</NavLink>
          <NavLink to="/completed-homes">Completed Homes</NavLink>
          <NavLink to="/interior-design">Interior Design</NavLink>
          <NavLink to="/ar-experience">AR Experience</NavLink>
          <NavLink to="/services">Services</NavLink>
          {user ? <NavLink to="/dashboard">Profile</NavLink> : null}
          {user?.role === "admin" ? <NavLink to="/admin-dashboard">Admin Dashboard</NavLink> : null}
          <NavLink to="/contact">Contact Us</NavLink>
        </nav>

        <div className="auth-cta">
          {user ? (
            <>
              <span className="pill">{user.name}</span>
              <button className="btn btn-outline" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline" to="/login">
                Login
              </Link>
              <Link className="btn btn-solid" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
