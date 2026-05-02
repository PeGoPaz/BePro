import { useState } from "react";
import { Link } from "react-router-dom";

/*
 * RegisterPage — sign-up form supporting two account types.
 * The role toggle at the top switches between Customer and Service Provider,
 * which will be sent as a "role" field to POST /api/auth/register in the next iteration.
 */
function RegisterPage() {
  /* "customer" or "provider" — determines which role is sent on submit */
  const [role, setRole] = useState("customer");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  /* Client-side validation before submitting to POST /api/auth/register */
  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (form.name.trim().length < 2) {
      nextErrors.name = "Name must be at least 2 characters.";
    }
    if (!form.email.includes("@")) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (form.password.length < 8) {
      nextErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(nextErrors);

    /* TODO: POST /api/auth/register — send { name, email, password, role } */
  };

  return (
    <div className="auth-page">
      {/* Brand mark — links back to the home page */}
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

      <h1 className="auth-heading">Create Account</h1>
      <p className="auth-subheading">Sign up to get started</p>

      <div className={`auth-card ${role === "provider" ? "auth-card-provider" : ""}`}>
        {/*
         * Role toggle — visually switches between Customer and Service Provider.
         * The selected role is stored in state and included on form submit.
         */}
        <div className="role-toggle" role="group" aria-label="Account type">
          <button
            type="button"
            className={`role-btn ${role === "customer" ? "role-btn-active" : ""}`}
            onClick={() => setRole("customer")}
          >
            Customer
          </button>
          <button
            type="button"
            className={`role-btn ${role === "provider" ? "role-btn-active" : ""}`}
            onClick={() => setRole("provider")}
          >
            Service Provider
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          {/* Full name */}
          <div className="auth-field">
            <label className="auth-label" htmlFor="reg-name">
              Full name
            </label>
            <input
              id="reg-name"
              name="name"
              type="text"
              placeholder="John Smith"
              value={form.name}
              onChange={handleChange}
              className="auth-input"
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <span id="name-error" className="error" role="alert">
                {errors.name}
              </span>
            )}
          </div>

          {/* Email */}
          <div className="auth-field">
            <label className="auth-label" htmlFor="reg-email">
              Email
            </label>
            <input
              id="reg-email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              className="auth-input"
              aria-describedby={errors.email ? "reg-email-error" : undefined}
            />
            {errors.email && (
              <span id="reg-email-error" className="error" role="alert">
                {errors.email}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="auth-field">
            <label className="auth-label" htmlFor="reg-password">
              Password
            </label>
            <input
              id="reg-password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              className="auth-input"
              aria-describedby={errors.password ? "reg-password-error" : undefined}
            />
            {errors.password && (
              <span id="reg-password-error" className="error" role="alert">
                {errors.password}
              </span>
            )}
          </div>

          {/* Submit */}
          <button className="auth-submit" type="submit">
            Create Account
          </button>
        </form>

        <p className="auth-footer-text">
          Already have an account?{" "}
          <Link to="/login" className="auth-footer-link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
