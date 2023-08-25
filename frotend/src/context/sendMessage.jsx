// Importing necessary modules
import { createContext, useState } from "react";

// Creating a context for sent messages
export const sendMessageContext = createContext();

// Defining the context provider
export const SendMessageProvider = ({ children }) => {
  // State to hold sent messages
  const [sendMessage, setSendMessage] = useState([]);

  return (
    // Providing the context value to its children
    <sendMessageContext.Provider value={{ sendMessage, setSendMessage }}>
      {children}
    </sendMessageContext.Provider>
  );
};
