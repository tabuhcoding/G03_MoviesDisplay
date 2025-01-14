"use client";

import React, { useState } from "react";
import "@styles/ChatBox.css";
import axios from "axios";
import { END_POINT_URL_LIST } from "@/src/util/constant";
import { link } from "fs";
import { JSX } from "@emotion/react/jsx-runtime";
interface Message {
  text: string;
  sender: string;
  link?: JSX.Element | null; // Thuộc tính link là tùy chọn
}

export default function ChatBox() {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>([{ text: "Hello! How can we help you today?", sender: "bot", link: null }]);
  const [input, setInput] = useState("");
  const [size, setSize] = useState({ width: 300, height: 400 }); // Kích thước mặc định
  const [isMinimized, setIsMinimized] = useState(false); // Thêm trạng thái để kiểm soát việc thu nhỏ

  const toggleChatBox = () => setIsOpen(!isOpen);

  const toggleMinimize = () => setIsMinimized(!isMinimized);

  const sendMessage = async () => {
    if (input.trim()) {
      // Hiển thị tin nhắn của user
      setMessages([...messages, { text: input, sender: "user" }]);
      const userMessage = input; // Lưu tin nhắn của user
      setInput(""); // Reset input field

      try {
        // Gửi tin nhắn tới API
        const response = await axios.get( `${process.env.NEXT_PUBLIC_BACKEND_URL}${END_POINT_URL_LIST.NAVIGATE}?query=${userMessage}`);
        if (response.data.data.ids.length > 0){
          const routeRes = response.data.data.route;
          const idsRes = response.data.data.ids;
          let link = ``;
          let text = "";
          if (routeRes === "MOVIE_PAGE"){
            text = "Here are some movies you might find what you wants:";
            link = `/movies?ids=${idsRes.join(",")}&text=${text}`;
          }
          else if (routeRes === "HOME_PAGE"){
            text = "You can find it in this page:";
            link = `/`;
          }
          else if (routeRes === "PROFILE_PAGE"){
            text = "Here is your profile:";
            link = `/profile`;
          }
          else if (routeRes === "CAST_PAGE"){
            text = "Go to one of these movie, you can see cast of the movie:";
            link = `/movies?ids=${idsRes.join(",")}&text=${text}`;
          }
          else if (routeRes === "NONE"){
            text = "Sorry, I can't find what you want. Please try again.";
          }

          setMessages((prev) => [
            ...prev,
            { 
              text: text, 
              sender: "bot", 
              link: link ? <a href={link} target="_blank" rel="noopener noreferrer">{link}</a> : null 
            }
          ]);
        }
        else{
          setMessages((prev) => [
            ...prev,
            { text: "Sorry, something went wrong. Please try again.", sender: "bot" },
          ]);
        }
          
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessages((prev) => [
          ...prev,
          { text: "Unable to connect to the server. Please try later.", sender: "bot" },
        ]);
      }
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
              <div key={idx} className={`message ${msg.sender}`}>
                <p>{msg.text}</p>
                {msg.link && <p>{msg.link}</p>} {/* Hiển thị liên kết nếu có */}
              </div>
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
