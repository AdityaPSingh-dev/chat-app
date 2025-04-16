# WebSocket Chat App

A simple WebSocket-based chat application built with **React**, **TailwindCSS**, and **Node.js**. This app allows users to communicate in real-time through a WebSocket server, offering features like unique username colors, message timestamps, and more.

---

## 🚀 Features

- **Real-time messaging**: Communicate with others instantly via WebSockets.
- **Unique username colors**: Each user gets a distinct color for their username.
- **Message timestamps**: Every message shows the time it was sent.
- **Responsive design**: The app is fully responsive and works well on both mobile and desktop devices.
- **Username setup**: Users can input a custom username before joining the chat.

---

## 🛠 Technologies Used

- **React** – A JavaScript library for building user interfaces.
- **TailwindCSS** – A utility-first CSS framework for designing the UI.
- **Node.js** – A JavaScript runtime for building the WebSocket server.
- **WebSockets** – Enables real-time communication between the client and server.

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/AdityaPSingh-dev/chat-app
cd websocket-chat-app
```

### 2. Install dependencies

#### Client-side (React app):

```bash
cd client
npm install
```

#### Server-side (WebSocket server):

```bash
cd server
npm install
```

---

## ▶️ Run the application

### Start the WebSocket server:

```bash
cd server
node server.js
```

### Start the React client:

```bash
cd client
npm run dev
```

- The React app will be accessible at `http://localhost:3000`
- The WebSocket server runs on port `3001`

---

## 💬 Usage

1. Open the application in your browser.
2. Enter a username and click **"Join Chat"** to start messaging.
3. Messages will appear with the **username**, **timestamp**, and **assigned color** for each user.
4. You can send and receive messages in **real-time**.

---


## 🚧 Future Improvements

- **User authentication**: Add login functionality for users to authenticate before chatting.
- **Private messages**: Allow users to send direct messages to each other.
- **Persistent chat history**: Save chat messages to a database to persist even after refreshing the page.

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 🙌 Acknowledgments

- [React](https://reactjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
