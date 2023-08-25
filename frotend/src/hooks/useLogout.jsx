// Importing the necessary module
import { useAuthContext } from "./useAuthContext";

// Custom hook for user logout
export const useLogout = () => {
  // Using the useAuthContext hook to access the dispatch function
  const { dispatch } = useAuthContext();

  // Function for handling user logout
  const logout = () => {
    // Remove user data from local storage
    localStorage.removeItem("user");

    // Update user data in auth context to log out
    dispatch({ type: "LOGOUT" });
  };

  // Returning the function for use
  return { logout };
};
