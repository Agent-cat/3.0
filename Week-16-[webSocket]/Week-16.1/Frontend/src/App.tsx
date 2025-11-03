import { useEffect, useRef, useState } from "react";

const App = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [messages, setMessages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    setSocket(ws);
    ws.onmessage = (e) => {
      setMessages((prev) => [...prev, e.data]);
    };
    ws.close = () => {};
    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = () => {
    if (!socket || !inputRef.current) return;
    const message = inputRef.current.value;
    socket.send(message);
    inputRef.current.value = "";
  };

  return (
    <div>
      <input ref={inputRef} type="text" placeholder="Type here..." />
      <button onClick={sendMessage}>Send Message</button>
      <ul>
        {messages.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
