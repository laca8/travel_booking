import Header from "./Header";

import React, { useState, useRef, useEffect } from "react";
import { Send, User, Shield } from "lucide-react";
const Notes = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (inputMessage.trim() === "") return;

    const newUserMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: "user",
    };

    const newBotMessage = {
      id: messages.length + 2,
      text: `You said: ${inputMessage}`, // Simple echo bot response
      sender: "bot",
    };

    setMessages([...messages, newUserMessage, newBotMessage]);
    setInputMessage("");
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  return (
    <div>
      <div className="bg-[var(--dark-color)]">
        <Header />
      </div>
      <div
        ref={messagesEndRef}
        className="container bg-gray-50 flex flex-col h-[600px] ">
        <div className="p-4 bg-white shadow">
          <h2 className="text-lg font-bold">المتابعات</h2>
        </div>

        <div className=" flex-1  p-4 space-y-4 overflow-y-auto ">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.sender === "user" ? "flex-row-reverse" : ""
              }`}>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.sender === "user" ? "bg-blue-100" : "bg-gray-100"
                }`}>
                {msg.sender === "user" ? (
                  <User size={16} />
                ) : (
                  <Shield size={16} />
                )}
              </div>
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-white shadow"
                }`}>
                <p className="text-sm">{msg.text}</p>
                <span
                  className={`text-xs mt-1 block ${
                    msg.sender === "user" ? "text-blue-100" : "text-gray-500"
                  }`}>
                  {msg.time}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 bg-white shadow">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="اكتب رسالتك هنا..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={() => handleSendMessage()}
              type="button"
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notes;
