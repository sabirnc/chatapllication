// Import necessary modules and components
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../../src/hooks/useLogin";
import { useAuthContext } from "../hooks/useAuthContext";

// Import CSS
import "../css/signin.css";

function Signin() {
  // State for storing username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Custom hook for handling login
  const { login, error, isLoading } = useLogin();

  // Navigation hook
  const navigate = useNavigate();

  // Access user authentication status
  const { user } = useAuthContext();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the login function from useLogin hook
      await login(username, password);

      // If user is authenticated, navigate to the main page
      if (user) {
        navigate("/");
      }
    } catch (err) {
      // Error handling if needed
    }
  };

  return (
    <main>
      <div className="form-container">
        <h2 className="form-head">Signin</h2>
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
          ></input>

          {/* Display error message if there's an error */}
          <p className="error">{error}</p>

          {/* Submit button with conditional text based on isLoading */}
          <button type="submit" className="signup-btn">
            {isLoading ? "Loading" : "Signin"}
          </button>
        </form>

        {/* Link to the signup page */}
        <Link className="signin-link" to="/signup">
          Don't have an account? Signup here.
        </Link>

        {/* Empty block for styling */}
        <div className="block"></div>
      </div>
    </main>
  );
}

export default Signin;
