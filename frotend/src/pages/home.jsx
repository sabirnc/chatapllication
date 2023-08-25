// Import necessary modules
import "../css/home.css";
import React, { useEffect, useState } from "react"; // Import React and other necessary modules
import Navbar from "../components/Navbar";
import Search from "../components/search";
import Chat from "../components/chats";
import Loading from "../components/Loading";
import Messages from "../components/messages";
import InputMsg from "../components/inputMsg";
import Nav from "../components/nav";
import { useSendMessageContext } from "../hooks/useSendMessageContexts";
import { useGetUsers } from "../hooks/useGetUsers";
import { useGetMessages } from "../hooks/useGetMessages";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSocketContext } from "../hooks/useSocketContext";
import { useAllMessageContext } from "../hooks/useAllMessageContext";

const Home = () => {
  const { getUsers, users, loading, error } = useGetUsers();
  const [chat, setChat] = useState(false);
  const [username, setUsername] = useState("");
  const { getMessages } = useGetMessages();
  const { user } = useAuthContext();
  const [messages, setMessages] = useState([]);
  const { setMsg } = useSocketContext();
  const { resetAllMessages } = useAllMessageContext();
  const { setSendMessage } = useSendMessageContext();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [visibility, setVisibility] = useState(true);
  const [chatVisible, setChatVisible] = useState(true);

  console.log(windowWidth);

  useEffect(() => {
    fetchUser();
  }, []);

  async function fetchUser() {
    await getUsers();
  }

  useEffect(() => {
    window.addEventListener("resize", resizeWindow);
    window.addEventListener("DOMContentLoaded",onLoaded)

    function onLoaded (){
      if(windowWidth < 950){
        setChatVisible(false)
      }
    }

    onLoaded()

    function resizeWindow() {
      setWindowWidth(window.innerWidth);
      if(windowWidth > 950){
        setChatVisible(true)
      }
      if(windowWidth < 950){
        setChatVisible(false)
        setVisibility(true)
      }
    }
  }, [windowWidth]);

  const handleClick = async (name) => {
    if (windowWidth < 950) {
      setVisibility(false);
      setChatVisible(true)
    }
    setChat(true);
    setUsername(name);
    const fetchedMessages = await getMessages(user.username, name);
    setMessages(fetchedMessages);
    resetAllMessages();
    setSendMessage([]);
    setMsg([]);
  };
  const styles = {
    chatList: {
      width: windowWidth < 950 ? "100%" : "30%",
    },
    chat: {
     width: windowWidth < 950 ? "100%" : "70%"
    },
  };
  return (
    <div className="home">
      <div className="chat-container">
        {visibility && (
          <div className="chatlist" style={styles.chatList}>
            <Navbar />
            <Search />
            <div className="local-chat-container">
              {loading && <span>Loading ...</span>}
              {users &&
                users.map((user) => (
                  <Chat key={user._id} user={user} handleClick={handleClick} />
                ))}
              {error && <span>{error}</span>}
            </div>
          </div>
        )}
        {chatVisible && (
          <div className="chat" style={styles.chat}>
            <Nav username={username} />
            {!chat ? <Loading /> : <Messages oldMessages={messages} />}{" "}
            {/* Simplify conditional rendering */}
            {chat && <InputMsg reciever={username} />}{" "}
            {/* Simplify conditional rendering */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home; // Export the component
