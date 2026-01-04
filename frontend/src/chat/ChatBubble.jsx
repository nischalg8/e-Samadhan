import { useState } from "react";
import ChatWindow from "./ChatWindow";
import "./chat.css";

export default function ChatBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && <ChatWindow onClose={() => setOpen(false)} />}
      <button className="chat-bubble" onClick={() => setOpen(!open)}>
        💬
      </button>
    </>
  );
}
