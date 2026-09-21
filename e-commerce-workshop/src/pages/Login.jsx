import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { login } from "../redux/authSlice";
import { apiRequest } from "../services/api";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!form.username || !form.password) {
      setError("Please enter username and password.");
      return;
    }

    setLoading(true);

    try {
      /*
       * STEP 1:
       * Check users created through our Signup page.
       */
      const workshopUsers = JSON.parse(
        localStorage.getItem("workshopUsers") || "[]"
      );

      const localUser = workshopUsers.find(
        (user) =>
          user.username.toLowerCase() ===
            form.username.toLowerCase() &&
          user.password === form.password
      );

      /*
       * STEP 2:
       * If local user exists, login directly.
       */
      if (localUser) {
        dispatch(
          login({
            user: localUser,

            // Fake token for workshop/demo purposes
            token: `workshop-token-${localUser.id}`,

            refreshToken: null,
          })
        );

        navigate("/");

        return;
      }

      /*
       * STEP 3:
       * If user wasn't created through our Signup page,
       * try DummyJSON's existing users.
       */
      const data = await apiRequest("/auth/login", {
        method: "POST",

        body: JSON.stringify({
          username: form.username,
          password: form.password,

          expiresInMins: 30,
        }),
      });

      /*
       * STEP 4:
       * Save DummyJSON authentication in Redux.
       */
      dispatch(
        login({
          user: data,
          token: data.accessToken,
          refreshToken: data.refreshToken,
        })
      );

      /*
       * STEP 5:
       * Redirect to homepage.
       */
      navigate("/");
    } catch (error) {
      setError(
        error.message ||
          "Invalid username or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to your ShopZone account
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>

            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup">
            Create Account
          </Link>
        </p>

        <div className="demo-login">
          <p>
            <strong>DummyJSON Demo Account</strong>
          </p>

          <p>
            Username: <strong>emilys</strong>
          </p>

          <p>
            Password: <strong>emilyspass</strong>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;