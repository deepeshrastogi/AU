import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRequest } from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    setSuccess("");

    // Basic validation
    if (
      !form.firstName ||
      !form.lastName ||
      !form.username ||
      !form.password
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      /*
       * STEP 1:
       * Call DummyJSON API.
       *
       * IMPORTANT:
       * DummyJSON user creation is simulated.
       * It does not permanently save the user.
       */
      await apiRequest("/users/add", {
        method: "POST",

        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          username: form.username,
          password: form.password,
        }),
      });

      /*
       * STEP 2:
       * Get existing workshop users.
       */
      const existingUsers = JSON.parse(
        localStorage.getItem("workshopUsers") || "[]"
      );

      /*
       * STEP 3:
       * Check if username already exists.
       */
      const userExists = existingUsers.some(
        (user) =>
          user.username.toLowerCase() === form.username.toLowerCase()
      );

      if (userExists) {
        setError("Username already exists. Please choose another username.");
        setLoading(false);
        return;
      }

      /*
       * STEP 4:
       * Create our local workshop user.
       */
      const newUser = {
        id: Date.now(),
        firstName: form.firstName,
        lastName: form.lastName,
        username: form.username,
        password: form.password,
      };

      /*
       * STEP 5:
       * Save user in localStorage.
       *
       * This is ONLY for this frontend workshop/demo.
       * Never store plain-text passwords in a real application.
       */
      existingUsers.push(newUser);

      localStorage.setItem(
        "workshopUsers",
        JSON.stringify(existingUsers)
      );

      /*
       * STEP 6:
       * Show success message.
       */
      setSuccess("Account created successfully!");

      /*
       * STEP 7:
       * Redirect to login page.
       */
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setError(error.message || "Signup failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Create your ShopZone account
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {success && (
          <div className="success-message">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>First Name</label>

            <input
              type="text"
              name="firstName"
              placeholder="Enter first name"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Last Name</label>

            <input
              type="text"
              name="lastName"
              placeholder="Enter last name"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>

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
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;