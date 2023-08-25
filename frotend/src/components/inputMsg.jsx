// Importing necessary CSS styles
import "../css/inputMsg.css";

// Importing required hooks
import { useState } from "react";

// Importing custom hooks
import { useSocketContext } from "../hooks/useSocketContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSendMessageContext } from "../hooks/useSendMessageContexts";

// InputMsg component definition
const InputMsg = ({ reciever }) => {
  // State to hold the input message
  const [message, setMessage] = useState("");

  // Getting socket context and user from custom hooks
  const { ws } = useSocketContext();
  const { user } = useAuthContext();
  const { setSendMessage } = useSendMessageContext();

  // Handling sending a message
  const handleMessage = () => {
    const date = new Date();
    const currentHour = date.getHours();
    const currentMinute = date.getMinutes();
    const currentSeconds = date.getSeconds();
    const currentTime = `${currentHour}:${currentMinute}:${currentSeconds}`;

    // Creating a message object
    const messageObj = {
      type: "message",
      message,
      sender: user.username,
      reciever,
      timestamp: currentTime,
    };

    // Sending the message over the socket
    ws.send(JSON.stringify(messageObj));

    // Updating the context with the sent message
    setSendMessage((prevMessages) => [...prevMessages, messageObj]);

    // Clearing the input field after sending
    setMessage("");
  };

  return (
    <div className="input-container">
      {/* Input field for typing the message */}
      <input
        type="text"
        placeholder="Type your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {/* Button to send the message */}
      <button className="send-btn" onClick={handleMessage}></button>
    </div>
  );
};

export default InputMsg;
