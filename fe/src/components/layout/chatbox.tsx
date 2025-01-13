"use client";

import React, { useState } from "react";
import "@styles/ChatBox.css";

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState([{ text: "Hello! How can we help you today?", sender: "bot" }]);
  const [input, setInput] = useState("");
  const [size, setSize] = useState({ width: 300, height: 400 }); // Kích thước mặc định
  const [isMinimized, setIsMinimized] = useState(false); // Thêm trạng thái để kiểm soát việc thu nhỏ

  const toggleChatBox = () => setIsOpen(!isOpen);

  const toggleMinimize = () => setIsMinimized(!isMinimized);

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: "Thank you for your message!", sender: "bot" }]);
      }, 1000);
    }
  };

  return (
    <div
      className={`chatbox ${isOpen ? "open" : "closed"}`}
      style={{
        width: `${isMinimized ? 300 : size.width}px`, 
        height: `${isMinimized ? 60 : size.height}px`, 
      }}
    >
      <div className="chatbox-header">
        <h4>Chat with us!</h4>
        <div className="chatbox-buttons">
          <button onClick={toggleMinimize} className="chatbox-minimize">
            {isMinimized ? "+" : "-"}
          </button>
          <button onClick={() => setIsOpen(false)} className="chatbox-close">x</button>
        </div>
      </div>
      {isOpen && !isMinimized && (
        <>
          <div className="chatbox-messages" style={{ height: `${size.height - 150}px` }}>
            {messages.map((msg, idx) => (
              <p key={idx} className={`message ${msg.sender}`}>
                {msg.text}
              </p>
            ))}
          </div>
          <div className="chatbox-input">
            <input
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chatbox-input-field"
            />
            <button onClick={sendMessage} className="chatbox-send">
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}
