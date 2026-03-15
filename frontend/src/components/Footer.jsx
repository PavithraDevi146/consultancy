import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="brand-mark" style={{ width: 28, height: 28, fontSize: '0.75rem' }}>AR</span>
            BuildVision AR
          </h4>
          <p>Experience completed homes in Augmented Reality before starting your next project. Build trust through immersive 3D visualization.</p>
        </div>
        <div>
          <h4>Platform</h4>
          <Link to="/about">About Us</Link>
          <Link to="/completed-homes">Completed Projects</Link>
          <Link to="/ar-experience">AR Experience</Link>
          <Link to="/services">Services</Link>
          <Link to="/dashboard">Client Dashboard</Link>
        </div>
        <div>
          <h4>Contact & Info</h4>
          <p className="muted-text" style={{ marginBottom: '0.5rem' }}>Construction & Infrastructure Solutions</p>
          <Link to="/contact">Contact Us</Link>
          <a href="mailto:info@buildvisionar.com" style={{ display: 'block', marginBottom: '0.5rem', marginTop: '0.5rem' }}>info@buildvisionar.com</a>
          <p className="accent">+91 98765 43210</p>
        </div>
      </div>
      <div className="container" style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ fontSize: '0.9rem' }}>&copy; {new Date().getFullYear()} BuildVision AR Platform. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span style={{ color: 'var(--text-light)', fontSize: '0.9rem', cursor: 'pointer' }}>Privacy Policy</span>
          <span style={{ color: 'var(--text-light)', fontSize: '0.9rem', cursor: 'pointer' }}>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
