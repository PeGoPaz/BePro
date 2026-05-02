import { useState } from "react";
import { Link } from "react-router-dom";


/* LoginPage — sign-in form for existing customers and service providers */
function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [errors, setErrors] = useState({});

  /* Handles both text inputs and the "remember me" checkbox */
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  /* Client-side validation before the form is submitted to POST /api/auth/login */
  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!form.email.includes("@")) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(nextErrors);

    /* TODO: connect to POST /api/auth/login — send { email, password, remember } */
  };

  return (
    <div className="auth-page">
      {/* Brand mark — calendar icon + BePro wordmark, links back to the home page */}
      <Link to="/" className="auth-brand">
        <svg
          className="auth-brand-icon"
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <rect x="3" y="4" width="18" height="18" rx="3" stroke="#1e4bdd" strokeWidth="2" />
          <line x1="3" y1="9" x2="21" y2="9" stroke="#1e4bdd" strokeWidth="2" />
          <line x1="8" y1="2" x2="8" y2="6" stroke="#1e4bdd" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="2" x2="16" y2="6" stroke="#1e4bdd" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span className="auth-brand-name">BePro</span>
      </Link>

      <h1 className="auth-heading">Welcome</h1>
      <p className="auth-subheading">Sign in to your account to continue</p>

      {/* White form card */}
      <div className="auth-card">
        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Email field */}
          <div className="auth-field">
            <label className="auth-label" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              className="auth-input"
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <span id="email-error" className="error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          {/* Password field */}
          <div className="auth-field">
            <label className="auth-label" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="auth-input"
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <span id="password-error" className="error" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          {/* Remember me checkbox */}
          <label className="auth-remember">
            <input
              name="remember"
              type="checkbox"
              checked={form.remember}
              onChange={handleChange}
            />
            Remember me
          </label>

          {/* Submit — will trigger POST /api/auth/login in a future iteration */}
          <button className="auth-submit" type="submit">
            Sign In
          </button>
        </form>

        {/* Link to the registration page */}
        <p className="auth-footer-text">
          Don't have an account?{" "}
          <Link to="/register" className="auth-footer-link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
