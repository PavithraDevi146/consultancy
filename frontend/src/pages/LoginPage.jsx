import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const loggedInUser = await login(form);
      navigate(loggedInUser?.role === "admin" ? "/admin-dashboard" : "/dashboard");
    } catch (err) {
      setError(err?.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="container section-space auth-wrap">
      <form className="auth-card" onSubmit={onSubmit}>
        <h2>Login</h2>
        <p className="muted-text">
          Registered users can log in to access the dashboard and explore saved projects.
        </p>
        {error ? <p className="error-text">{error}</p> : null}
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
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="btn btn-solid" type="submit" disabled={loading}>
          {loading ? "Please wait..." : "Login"}
        </button>
        <p>
          New user? <Link to="/signup">Create account</Link>
        </p>
      </form>
    </section>
  );
};

export default LoginPage;
