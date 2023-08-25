// Importing necessary CSS styles
import "../css/messages.css";

// Importing components
import { ChatMessage } from "../components/chatMessage";

// Importing required hooks
import { useState, useEffect } from "react";

// Importing custom hooks
import { useGetMessages } from "../hooks/useGetMessages";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSocketContext } from "../hooks/useSocketContext";
import { useSendMessageContext } from "../hooks/useSendMessageContexts";

// Importing library
import { nanoid } from "nanoid";

// Messages component definition
const Messages = ({ oldMessages }) => {
  return (
    <div className="msg-container">
      {/* Rendering the ChatMessage component */}
      <ChatMessage oldMessages={oldMessages} />
    </div>
  );
};


export default Messages;
