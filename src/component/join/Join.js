import React, { useState } from "react";
import "./Join.css";
import { Link } from "react-router-dom";

let user;

const sendUser = () => {
  user = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";
};

const Join = () => {
  const [name, setName] = useState("");
  return (
    <div className="joinPage">
      <div className="joinContainer">
        <img
          src="https://images.unsplash.com/photo-1577563908411-5077b6dc7624?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="logo"
        />
        <h1>Chat Application</h1>
        <input
          type="text"
          className="joinInput"
          id="joinInput"
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Link to="/chat" onClick={(e) => (!name ? e.preventDefault() : null)}>
          {" "}
          <button onClick={sendUser} className="joinBtn">
            Join
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
