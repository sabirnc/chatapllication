// Importing necessary modules
import React, { createContext, useEffect, useReducer } from "react";

// Creating an Auth context
export const AuthContext = createContext();

// Reducer function for managing authentication state
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      localStorage.removeItem("user");
      return { user: null };
    default:
      return state;
  }
};

// Defining the Auth context provider
export const AuthContextProvider = ({ children }) => {
  // Using the authReducer to manage authentication state
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  // Checking localStorage for user data on mount
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // Dispatching a "LOGIN" action if user data exists
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  // Providing the Auth context value to its children
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
