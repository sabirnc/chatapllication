// Importing necessary CSS styles
import "../css/nav.css";

// Importing custom hook
import { useAuthContext } from "../hooks/useAuthContext";

// Nav component definition
const Nav = ({ username }) => {
  // Using custom hook to access authentication context
  const { dispatch } = useAuthContext();

  // Handling logout button click
  const handleClick = () => {
    dispatch({ type: "LOGOUT" }); // Dispatching a logout action
  };

  return (
    <nav className="nav chat-nav">
      {/* Displaying the username */}
      <span>{username}</span>
      {/* Logout button */}
      <button className="logout-btn" onClick={handleClick}>
        Logout
      </button>
    </nav>
  );
};

export default Nav;
