// Import necessary modules and components
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "../hooks/useSignup";

// Import CSS
import "../css/signin.css";

function Signup() {
  // State for storing username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Custom hook for handling signup
  const { signup, isLoading, error } = useSignup();

  // Navigation hook
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the signup function from useSignup hook
      await signup(username, password);

      // If signup is successful, navigate to the signin page
      if (!error) {
        navigate("/signin");
      }
    } catch (err) {
      // Error handling if needed
    }
  };

  return (
    <main>
      <div className="form-container">
        <h2 className="form-head">Signup</h2>
        <form onSubmit={handleSubmit}>
          {/* Input fields for username and password */}
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></input>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="true"
          ></input>

          {/* Display error message if there's an error */}
          <p className="error">{error}</p>

          {/* Submit button with conditional text and disabled state */}
          <button type="submit" className="signup-btn" disabled={isLoading}>
            {isLoading ? "Loading" : "Signup"}
          </button>
        </form>

        {/* Link to the signin page */}
        <Link className="signin-link" to="/signin">
          Already have an account? Signin here.
        </Link>

        {/* Empty block for styling */}
        <div className="block"></div>
      </div>
    </main>
  );
}

export default Signup;
