// Importing the necessary CSS styles
import "../css/chat.css";

// Chat component definition
const Chat = ({ user, handleClick }) => {
  return (
    // Container for each chat user, clicking triggers handleClick
    <div className="local-chat" onClick={() => handleClick(user.username)}>
      {/* Displaying the user's initials */}
      <span className="chat-icon">{user.username[0].toUpperCase()}</span>
      {/* Displaying the username */}
      <span className="username">{user.username}</span>
    </div>
  );
};

export default Chat;
