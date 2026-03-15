import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const toFriendlySignupError = (errorMessage = "") => {
  const normalized = errorMessage.toLowerCase();

  if (normalized.includes("already exists")) {
    return "Email already exists. Please login or use another email.";
  }

  if (normalized.includes("at least 6") || normalized.includes("min") || normalized.includes("length")) {
    return "Password must be at least 6 characters.";
  }

  if (normalized.includes("name") && normalized.includes("email") && normalized.includes("password")) {
    return "Please enter name, email, and password.";
  }

  return errorMessage || "Signup failed. Please try again.";
};

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, loading } = useAuth();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => setError(""), 5000);
    return () => clearTimeout(timer);
  }, [error]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      const { confirmPassword, ...payload } = form;
      await signup(payload);
      navigate("/dashboard");
    } catch (err) {
      const message = err?.response?.data?.message || "Signup failed";
      setError(toFriendlySignupError(message));
    }
  };

  return (
    <section className="container section-space auth-wrap">
      <form className="auth-card" onSubmit={onSubmit}>
        <h2>Signup</h2>
        <p className="muted-text">
          New users can create an account to access additional dashboard and project features.
        </p>
        {error ? (
          <div className="toast toast-error" role="alert" aria-live="polite">
            <p>{error}</p>
            <button
              type="button"
              className="toast-close"
              onClick={() => setError("")}
              aria-label="Dismiss error"
            >
              x
            </button>
          </div>
        ) : null}
        <input
          className="input"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="input"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="input"
          placeholder="Password"
          type="password"
          minLength={6}
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <input
          className="input"
          placeholder="Confirm Password"
          type="password"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
          required
        />
        <button className="btn btn-solid" type="submit" disabled={loading}>
          {loading ? "Please wait..." : "Sign up"}
        </button>
        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
};

export default SignupPage;
