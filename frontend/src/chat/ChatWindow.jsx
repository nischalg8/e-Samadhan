import { useState, useRef, useEffect } from "react";
import "./chat.css"; // make sure this points to your chat CSS

export default function ChatWindow({ onClose }) {
  const [messages, setMessages] = useState([
    { from: "gov", type: "text", content: "How may I help you?" }
  ]);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendText = () => {
    if (!text.trim()) return;
    setMessages([...messages, { from: "user", type: "text", content: text }]);
    setText("");
  };

  // Handle pressing Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendText();
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        Gov Support
        <button onClick={onClose}>✕</button>
      </div>

      <div className="chat-body">
        {messages.map((m, i) => (
          <div key={i} className={`msg ${m.from}`}>
            {m.type === "text" ? (
              m.content
            ) : (
              <img
                src={m.content}
                alt="uploaded"
                style={{ maxWidth: "100%", borderRadius: "8px" }}
              />
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type message"
        />
        <button onClick={sendText}>Send</button>
      </div>
    </div>
  );
}
