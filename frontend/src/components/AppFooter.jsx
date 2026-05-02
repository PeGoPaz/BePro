import { Link } from "react-router-dom";

function AppFooter() {
  return (
    <footer className="app-footer">
      <div className="footer-top">
        <p className="footer-brand">BePro</p>
        <p className="footer-copy">
          Book trusted services faster. Manage appointments without stress.
        </p>
      </div>
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/providers">Find services</Link>
        <Link to="/register">Join as provider</Link>
        <Link to="/login">Login</Link>
      </div>
      <p className="footer-meta">© {new Date().getFullYear()} BePro</p>
    </footer>
  );
}

export default AppFooter;
