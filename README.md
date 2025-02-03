# Tic-Tac-Toe Web Application

A modern and interactive Tic-Tac-Toe game built using **Spring Boot** for the backend and **HTML, CSS, and JavaScript** for the frontend. This project features a sleek UI, responsive design, and fun enhancements such as animations, sound effects, and dark mode.

## 🚀 Features
- **Turn-based gameplay** between "X" and "O".
- **Win detection** with glowing animations for winning combinations.
- **Draw detection** when the board is full without a winner.
- **Reset functionality** to clear the board and restart the game.
- **Dark mode toggle** for switching between light and dark themes.
- **Sound effects** for winning and resetting the game.
- **Responsive design** that works on both desktop and mobile devices.
- **Custom fonts** using Google Fonts for a modern look.

---
## 📌 Table of Contents
- [Prerequisites](#prerequisites)
- [Installation Instructions](#installation-instructions)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---
## 🔧 Prerequisites
Before running this project, ensure you have the following installed:

- **JDK 23**
- **Maven**
- **Git**

---
## 🛠️ Installation Instructions
Follow these steps to set up and run the project:

1. **Clone the repository**
   ```sh
   git clone https://github.com/mr-umar-ahmed/TicTacToe-Web.git
   ```

2. **Navigate into the project directory**
   ```sh
   cd TicTacToe-Web
   ```

3. **Build the project**
   ```sh
   mvn clean install
   ```

4. **Run the application**
   ```sh
   mvn spring-boot:run
   ```

5. **Access the game** in your browser:
   ```sh
   http://localhost:8080
   ```

---
## 📡 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/game-state` | Retrieves the current state of the game. |
| POST   | `/api/make-move` | Makes a move at the specified position. |
| POST   | `/api/reset-game` | Resets the game board. |

---
## 🖼️ Screenshots (Placeholders)
- **Game Interface** 🕹️ ![Screenshot 2025-02-02 221622](https://github.com/user-attachments/assets/8d71fc01-1425-4363-b074-d552c199670a)

- **Win Detection Animation** ✨ ![Screenshot 2025-02-03 112512](https://github.com/user-attachments/assets/4b1bddf9-b8cd-4c3c-b999-82d4d72d063c)

- **Dark Mode UI** 🌙 ![Screenshot 2025-02-03 112423](https://github.com/user-attachments/assets/56a183d8-24b8-4613-b378-288ce28ef7c4)


---
## 🤝 Contributing
We welcome contributions! To contribute:
1. **Fork the repository**.
2. **Create a new branch** (`git checkout -b feature-branch`).
3. **Make your changes** and commit (`git commit -m 'Added new feature'`).
4. **Push to your fork** (`git push origin feature-branch`).
5. **Submit a pull request**.

---
## 📜 License
This project is licensed under the **MIT License**. See the `LICENSE` file for more details.

---
## 💡 Acknowledgements
This project was made possible thanks to:
- **Spring Boot** for backend development.
- **Google Fonts** for custom typography.
- **Open-source community** for inspiration and resources.

---
## 👤 Author
**Umar Ahmed**  
[GitHub Profile](https://github.com/mr-umar-ahmed)

---

Happy coding! 🚀🎮

