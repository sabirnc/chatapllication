// Importing necessary modules
import { useAuthContext } from "./useAuthContext";
import { useState } from "react";

// Custom hook for user signup
export const useSignup = () => {
  // States for error and loading
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Using the useAuthContext hook to access the dispatch function
  const { dispatch } = useAuthContext();

  // Function for handling user signup
  const signup = async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:4000/user/signup", {
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
      setError("An error occurred while signing up.");
      setIsLoading(false);
    }
  };

  // Returning the values for use
  return { signup, isLoading, error };
};
