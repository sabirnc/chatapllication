// Importing the necessary context
import { useContext } from "react";
import { sendMessageContext } from "../context/sendMessage";

// Custom hook to access the sendMessageContext
export const useSendMessageContext = () => {
  // Using the useContext hook to access the context
  const context = useContext(sendMessageContext);

  // Checking if the context exists
  if (!context) {
    throw Error(
      "useSendMessageContext must be used within the SendMessageContextProvider"
    );
  }

  // Returning the context for use
  return context;
};
