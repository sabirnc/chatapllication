// Importing necessary modules
import { useEffect, createContext, useState } from "react";

// Importing custom hook
import { useAuthContext } from "../hooks/useAuthContext";

// Creating a context for WebSocket management
export const socketContext = createContext();

// WebsocketProvider component definition
const WebsocketProvider = ({ children }) => {
  // Creating a new WebSocket instance
  const ws = new WebSocket("ws://localhost:4000");

  // Using the useAuthContext custom hook to access user data
  const { user } = useAuthContext();

  // States to manage WebSocket data
  const [info, setInfo] = useState("");
  const [msg, setMsg] = useState([]);

  useEffect(() => {
    // Setting up WebSocket event handlers
    if (user) {
      ws.onopen = () => {
        // Sending user information when WebSocket connection opens
        ws.send(
          JSON.stringify({
            type: "name",
            name: user.username,
          })
        );
        console.log("Connected successfully");
      };
    }

    ws.onmessage = (message) => {
      // Handling incoming WebSocket messages
      const content = JSON.parse(message.data);
      setMsg((prev) => [...prev, content]);
    };
  }, [ws, user]); // Dependency array to ensure effect updates

  return (
    // Providing the context value to its children
    <socketContext.Provider value={{ ws, msg, info, setMsg }}>
      {children}
    </socketContext.Provider>
  );
};

export default WebsocketProvider;
