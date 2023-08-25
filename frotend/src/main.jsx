import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "../src/index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "../src/context/AuthContext.jsx";
import WebsocketProvider from "./context/websocket.jsx";
import { AllMessageContextProvider } from "./context/allMessage.jsx";
import { SendMessageProvider } from "./context/sendMessage.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthContextProvider>
      <WebsocketProvider>
        <AllMessageContextProvider>
         <SendMessageProvider>
            <App/>
         </SendMessageProvider>
        </AllMessageContextProvider>
      </WebsocketProvider>
    </AuthContextProvider>
  </BrowserRouter>
);
