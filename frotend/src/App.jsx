// Import necessary components and modules
import Signin from "./pages/signin";
import Home from "./pages/home";
import Signup from "./pages/Signup";

// Import necessary routing components from react-router-dom
import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Import custom hook for authentication context
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  // Use the useAuthContext hook to get user information
  const { user } = useAuthContext();

  return (
    <Routes>
      {/* Define routes based on user authentication status */}
      <Route path="/" element={user ? <Home /> : <Navigate to="/signin" />} />
      <Route
        path="/signup"
        element={!user ? <Signup /> : <Navigate to="/" />}
      />
      <Route
        path="/signin"
        element={!user ? <Signin /> : <Navigate to="/" />}
      />
    </Routes>
  );
}

export default App;
