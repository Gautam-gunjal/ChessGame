# ♟️ Chess Game (Real-time)

A real-time multiplayer **Chess** game built with **Node.js**, **Express.js**, **Socket.IO**, **EJS**, and **chess.js**.  
Supports a 2-player match with an additional spectator role. The server entry point is `app.js` — start it with `node app.js`.

---

## 📑 Table of Contents

- [About](#about)
- [🚀 Features](#features)
- [🛠️ Tech Stack](#tech-stack)
- [📂 Project Structure](#project-structure)
- [⚙️ Installation & Setup](#installation--setup)
- [▶️ How to Play (Roles & Flow)](#how-to-play-roles--flow)
- [🔌 Socket & Game Notes](#socket--game-notes)
- [📸 Screenshots (Optional)](#screenshots-optional)
- [🤝 Contributing](#contributing)
- [📜 License](#license)
- [👤 Author](#author)

---

## 🧾 About

This project is a web-based Chess game that synchronizes gameplay in real-time between connected clients using Socket.IO. The first two connected clients become players (White and Black); any further connections become spectators who can watch the game live.

---

## 🚀 Features

- Real-time gameplay synchronized with **Socket.IO**.  
- Move validation and game state management using **chess.js**.  
- Simple server-rendered UI with **EJS** (views).  
- Role assignment on connection:
  - First connection → **White**
  - Second connection → **Black**
  - Third (and subsequent) connections → **Spectator**
- Start the server with `node app.js` (or `nodemon app.js` for development).

---

## 🛠️ Tech Stack

- **Runtime:** Node.js  
- **Server:** Express.js  
- **Real-time:** Socket.IO  
- **Game logic:** chess.js  
- **Views:** EJS  
- **Language:** JavaScript

---

## 📂 Project Structure

```
ChessGame/
│── public/        # Static files (client JS, CSS)
│── views/         # EJS templates (game UI, lobby, etc.)
│── app.js         # Server entry point (starts Socket.IO)
│── package.json   # Dependencies and scripts
```



---

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Gautam-gunjal/ChessGame.git
   cd ChessGame
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the server**
   ```bash
   node app.js
   ```
   Or for automatic reload during development:
   ```bash
   nodemon app.js
   ```

4. **Open the app**
   ```
   http://localhost:3000
   ```

If your server listens on a different port (for example using an environment variable `PORT`), use that port in the URL.

---

## ▶️ How to Play (Roles & Flow)

- When a client connects to the server, the server assigns a role:
  - **1st client** → becomes **White** and will play first.
  - **2nd client** → becomes **Black** and will play second.
  - **3rd+ clients** → become **Spectator** (read-only view of the board).
- Moves are sent to the server via Socket.IO events; the server (or client using `chess.js`) validates moves and broadcasts the updated board to all connected clients so players and spectators stay in sync.
- If a player disconnects, implement your own policy (e.g., allow reconnection, promote a spectator, or end the game). (Adjust behavior in `app.js` as needed.)

---

## 🔌 Socket & Game Notes

- Common socket events you might have (implementation-dependent):
  - `connection` / `disconnect` — manage connected clients and roles.
  - `join` — optional, to join a specific room or game.
  - `move` — emitted by a player to request a move (payload: SAN / from-to / move object).
  - `gameState` or `update` — server → clients to broadcast the latest board / FEN / PGN.
  - `gameOver` — notify clients when checkmate/stalemate/draw occurs.

- **Move validation:** Use `chess.js` to validate legality of moves and detect checkmate/stalemate/draw before broadcasting updates.

- **Spectator UX:** Spectators receive the same `gameState` updates as players but should not be allowed to emit `move` events (ignore or reject move events from spectators on the server).

---

## 📸 Screenshots (Optional)

Add screenshots or GIFs of the game UI here (board, lobby, move list, etc.).

---

## 🤝 Contributing

Contributions welcome! If you'd like to add features (timers, move history, multi-room support, AI opponent, persistence), follow these steps:

1. Fork the repository  
2. Create a feature branch (`git checkout -b feat/my-feature`)  
3. Commit your changes (`git commit -m "Add my feature"`)  
4. Push to your branch and open a Pull Request

Please include clear descriptions and, where applicable, tests.

---

## 📜 License

This project is provided under the **MIT License**.

---

## 👤 Author

**Gautam Gunjal**  
🔗 [GitHub Profile](https://github.com/Gautam-gunjal)

---


