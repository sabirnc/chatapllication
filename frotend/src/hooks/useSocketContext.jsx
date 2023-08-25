// Importing the necessary context
import { useContext } from "react";
import { socketContext } from "../context/websocket";

// Custom hook to access the socketContext
export const useSocketContext = () => {
  // Using the useContext hook to access the context
  const context = useContext(socketContext);

  // Checking if the context exists
  if (!context) {
    throw Error("useSocketContext must be used within the WebSocketProvider");
  }

  // Returning the context for use  
  return context;
};
