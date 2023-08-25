// Importing the necessary context
import { allMessageContext } from "../context/allMessage";

// Importing the useContext hook
import { useContext } from "react";

// Custom hook to access the allMessageContext
export const useAllMessageContext = () => {
  // Using the useContext hook to access the context
  const context = useContext(allMessageContext);

  // Checking if the context exists
  if (!context) {
    throw Error(
      "useAllMessageContext must be used within the AllMessageContextProvider"
    );
  }

  // Returning the context for use
  return context;
};
