// Importing necessary modules
import { createContext, useState } from "react";

// Creating a context
export const allMessageContext = createContext();

// Defining the context provider
export const AllMessageContextProvider = ({ children }) => {
  // State to hold all messages
  const [allMessages, setAllMessages] = useState([]);

  const resetAllMessages = () => {
    console.log("reseting")
  }

  return (
    // Providing the context value to its children
    <allMessageContext.Provider value={{ allMessages, setAllMessages , resetAllMessages }}>
      {children}
    </allMessageContext.Provider>
  );
};
