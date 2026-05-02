import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/providers", label: "Providers" },
  { to: "/booking", label: "Booking" },
];

function AppHeader() {
  return (
    <header className="topbar">
      <NavLink to="/" className="brand" aria-label="Go to home page">
        BePro
      </NavLink>
      <div className="topbar-right">
        <nav className="topnav" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                isActive ? "nav-link nav-link-active" : "nav-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <NavLink to="/login" className="button button-primary topbar-login">
          Login
        </NavLink>
      </div>
    </header>
  );
}

export default AppHeader;
