"use client";
import { useState, useEffect, useRef } from "react";

export default function Chatbot() {

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hi! How can I assist you today?", sender: "bot" }]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const getBotResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) return "Hello! How can I assist you? ";
    if (lowerMessage.includes("order") || lowerMessage.includes("shipping")) return "You can track your order in the 'Orders' section.";
    if (lowerMessage.includes("refund")) return "Refunds take 3-5 business days.";
    if (lowerMessage.includes("support")) return "Our support team is available 24/7. Contact us at support@example.com.";
    if (lowerMessage.includes("thank you") || lowerMessage.includes("thanks")) return "You're welcome! Have a great day! ";
    
    return "I'm not sure about that kurva anyam but our support team is always happy to help!";
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const botResponse = getBotResponse(input);
      setMessages( (prev) => [...prev, { text: botResponse, sender: "bot" }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6">
      <button onClick={() => setOpen(!open)} className="bg-black text-white p-4 rounded-full shadow-lg transition-all hover:scale-110">
        💬
      </button>

      {open && (
        <div className="absolute bottom-14 right-0 w-72 bg-white dark:bg-gray-900 p-4 shadow-xl rounded-lg border border-gray-300 dark:border-gray-700 flex flex-col">
          <div className="text-lg font-semibold text-gray-900 dark:text-white flex justify-between items-center pb-2 border-b border-gray-300 dark:border-gray-700">
            Chatbot 🤖
            <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
              ✖
            </button>
          </div>

          <div className="h-60 overflow-y-auto p-2 space-y-2">
            {messages.map((msg, i) => (
              <p
                key={i}
                className={`p-2 rounded-lg max-w-64 ${
                  msg.sender === "bot"
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white self-start"
                    : "bg-black text-white self-end"
                }`}
              >
                {msg.text}
              </p>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center border-t border-gray-300 dark:border-gray-700 pt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:bg-gray-800 dark:text-white"
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="ml-2 bg-black text-white p-2 rounded-lg hover:opacity-80 transition">
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
