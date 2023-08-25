// Importing necessary modules
import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

// Custom hook for user login
export const useLogin = () => {
  // States for loading, error, and authentication
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  // Using the useAuthContext hook to access the dispatch function
  const { dispatch } = useAuthContext();

  // Function for handling user login
  const login = async (username, password) => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const json = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
      } else {
        // Save user to local storage
        localStorage.setItem("user", JSON.stringify(json));

        // Update user data in auth context
        dispatch({ type: "LOGIN", payload: json });

        setIsLoading(false);
      }
    } catch (error) {
      setError("An error occurred while logging in.");
      setIsLoading(false);
    }
  };

  // Returning the values for use
  return { login, error, isLoading };
};
