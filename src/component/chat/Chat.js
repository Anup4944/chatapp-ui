import React, { useState, useEffect } from "react";
import "./Chat.css";
import { user } from "../join/Join";
import socketIo from "socket.io-client";
import Message from "../message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";

const ENDPOINT = "https://backendchatapp.onrender.com/";

let socket;

const Chat = () => {
  const [id, setId] = useState("");

  const [messages, setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });

    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      alert("Connection successful");
      setId(socket.id);
    });

    socket.emit("joined", { user });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("Welcome", (data) => {
      setMessages([...messages, data]);
    });
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
    });
    socket.on("leave", (data) => {
      setMessages([...messages, data]);
    });
    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="chatHeader">
          <h2>Quick Chat</h2>
          <a href="/"> Exit </a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Message
              key={i}
              message={item.message}
              classs={item.id === id ? "rightSide" : "leftSide"}
              user={item.id === id ? "" : item.user}
            />
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            type="text"
            id="chatInput"
            onKeyPress={(e) => (e.key === "Enter" ? send() : null)}
          />
          <button className="sendBtn" onClick={send}>
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
