// Importing necessary modules
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom"; // Assuming this is used somewhere else

// Custom hook for fetching user data
export const useGetUsers = () => {
  // States for loading, error, and users
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [users, setUsers] = useState([]);

  // Using the useAuthContext hook to access user data
  const { user } = useAuthContext();

  // Function to fetch users
  const getUsers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:4000/user/users", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const json = await response.json();

      // If response is not OK
      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("user");
          // Assuming that you're using Navigate to handle routing
          Navigate("/login"); // Redirect to login if not authenticated
        }
        setError(json.error);
        setLoading(false);
      } else {
        setUsers(json.users);
        setLoading(false);
      }
    } catch (error) {
      setError("An error occurred while fetching users.");
      setLoading(false);
    }
  };

  // Returning the values for use
  return { getUsers, error, loading, users };
};
