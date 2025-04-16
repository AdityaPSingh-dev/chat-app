import { useEffect, useState, useRef } from "react";

const userColorMap = {};
const colors = [
  "text-blue-600",
  "text-green-600",
  "text-red-600",
  "text-purple-600",
  "text-orange-600",
  "text-pink-600",
  "text-yellow-600",
  "text-teal-600",
  "text-indigo-600",
];

export default function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = new WebSocket("ws://localhost:3001");
    socketRef.current.onmessage = async (event) => {
      let data = event.data;
      if (data instanceof Blob) {
        data = await data.text();
      }
      try {
        const parsed = JSON.parse(data);
        // Prevent duplicate welcome messages by checking if it's a server message and already exists
        if (parsed.user === "Server" && parsed.text.includes("Welcome")) {
          setMessages((prev) => {
            const exists = prev.some(
              (m) => m.user === "Server" && m.text === parsed.text
            );
            return exists ? prev : [...prev, parsed];
          });
        } else if (parsed.user !== username) {
          setMessages((prev) => [...prev, parsed]);
        }
      } catch {
        setMessages((prev) => [
          ...prev,
          { user: "Server", text: data, time: new Date().toLocaleTimeString() },
        ]);
      }
    };
    return () => socketRef.current?.close();
  }, [username]);

  const sendMessage = () => {
    if (socketRef.current && input.trim()) {
      const messageData = {
        user: username,
        text: input,
        time: new Date().toLocaleTimeString(),
      };
      socketRef.current.send(JSON.stringify(messageData));
      setMessages((prev) => [...prev, messageData]);
      setInput("");
    }
  };

  const getColorForUser = (user) => {
    if (!userColorMap[user]) {
      const availableColors = colors.filter(
        (c) => !Object.values(userColorMap).includes(c)
      );
      userColorMap[user] =
        availableColors.length > 0
          ? availableColors[0]
          : colors[user.length % colors.length];
    }
    return userColorMap[user];
  };

  if (!isUsernameSet) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
          <h2 className="text-lg font-bold mb-4">Enter your username</h2>
          <input
            type="text"
            className="w-full p-2 border rounded mb-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && username.trim() && setIsUsernameSet(true)
            }
            placeholder="Your name"
          />
          <button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            onClick={() => username.trim() && setIsUsernameSet(true)}
          >
            Join Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-md p-4">
        <h1 className="text-xl font-bold mb-4 text-center">WebSocket Chat</h1>
        <div className="h-64 overflow-y-auto mb-4 border p-2 rounded bg-gray-50">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <span className={`font-semibold ${getColorForUser(msg.user)}`}>
                {msg.user}
              </span>
              <span className="text-xs text-gray-500 ml-2">{msg.time}</span>
              <div className="ml-4">{msg.text}</div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-grow border rounded p-2"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
