// Importing the necessary context
import { AuthContext } from "../context/AuthContext";

// Importing the useContext hook
import { useContext } from "react";

// Custom hook to access the AuthContext
export const useAuthContext = () => {
  // Using the useContext hook to access the context
  const context = useContext(AuthContext);

  // Checking if the context exists
  if (!context) {
    throw Error("useAuthContext must be used within the AuthContextProvider");
  }

  // Returning the context for use
  return context;
};
