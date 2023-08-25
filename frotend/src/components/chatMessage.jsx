// Importing required dependencies and styles
import { nanoid } from "nanoid";
import { useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSendMessageContext } from "../hooks/useSendMessageContexts";
import { useSocketContext } from "../hooks/useSocketContext";
import { useGetMessages } from "../hooks/useGetMessages";
import { useAllMessageContext } from "../hooks/useAllMessageContext";
import "../css/chatMessage.css"; // Make sure to provide the correct path to your CSS file.

// ChatMessage component definition
export const ChatMessage = ({ oldMessages }) => {
  // Custom hook contexts
  const { user } = useAuthContext();
  const { sendMessage } = useSendMessageContext();
  const { msg, info } = useSocketContext();
  const { allMessages , setAllMessages } = useAllMessageContext()

  // Combining all messages from different sources
  useEffect( () => {
    setAllMessages([...msg,...oldMessages,...sendMessage])
  },[msg, oldMessages , sendMessage])

  console.log(allMessages, "allmessages")
  console.log(oldMessages, 'oldMessages')
  console.log(msg, "msg")
  console.log(sendMessage, "sendMessage")

  // Sorting messages by timestamp in descending order
  allMessages.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  // Styling for message container
  const styles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
  };

  // Rendering the component
  return (
    <div className="chatMessage-container" style={styles}>
      <div className="message-list">
        {/* Mapping and rendering each message */}
        {allMessages.map((message) => (
          <div
            key={nanoid()} // Using nanoid for unique key
            className={`message ${
              message.sender === user.username ? "right" : "left"
            }`}
          >
            <p
              className={`container ${
                message.sender === user.username
                  ? "right-border"
                  : "left-border"
              }`}
            >
              {message.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

