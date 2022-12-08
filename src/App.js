import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Join from "./component/join/Join";
import Chat from "./component/chat/Chat";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Join />} exact />
          <Route path="/chat" element={<Chat />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
