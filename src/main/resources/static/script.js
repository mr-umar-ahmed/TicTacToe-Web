document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const message = document.createElement("div");
    message.id = "message";
    document.querySelector(".container").appendChild(message);

    let currentPlayer = "X"; // Start with "X"
    const gameState = {};

    // Initialize the game board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }

    // Handle cell click events
    function handleCellClick(event) {
        const cell = event.target;
        const position = parseInt(cell.dataset.index);

        // Ignore clicks on already filled cells
        if (cell.textContent !== "") {
            return;
        }

        // Make a move via the backend API
        fetch(`/api/make-move?position=${position}&player=${currentPlayer}`, { method: "POST" })
            .then(response => response.text())
            .then(result => {
                if (result === "Move successful!") {
                    cell.textContent = currentPlayer;
                    cell.classList.add(currentPlayer); // Add class for styling
                    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
                } else if (result.startsWith("Winner:")) {
                    const winner = result.split(": ")[1];
                    displayMessage(`Player ${winner} Wins!`);
                    disableBoard();
                } else if (result === "Draw!") {
                    displayMessage("It's a Draw!");
                    disableBoard();
                } else {
                    alert(result); // Show error message (e.g., "Position already taken!")
                }
            });
    }

    // Fetch the current game state from the backend
    fetch("/api/game-state")
        .then(response => response.json())
        .then(state => {
            for (const [position, player] of Object.entries(state)) {
                const cell = board.children[position];
                cell.textContent = player;
                cell.classList.add(player); // Add class for styling

                // Update currentPlayer based on the last move
                if (player === "X") {
                    currentPlayer = "O";
                } else if (player === "O") {
                    currentPlayer = "X";
                }
            }
        });

    // Reset the game
    document.getElementById("reset-button").addEventListener("click", () => {
        fetch("/api/reset-game", { method: "POST" })
            .then(response => response.text())
            .then(() => {
                // Clear the board
                for (const cell of board.children) {
                    cell.textContent = "";
                    cell.className = "cell"; // Reset class
                }

                // Reset the current player to "X"
                currentPlayer = "X";

                // Clear the message
                message.textContent = "";
                enableBoard();
            });
    });

    // Display a message (e.g., "Player X Wins!" or "It's a Draw!")
    function displayMessage(text) {
        message.textContent = text;
    }

    // Disable the board (prevent further moves)
    function disableBoard() {
        for (const cell of board.children) {
            cell.style.pointerEvents = "none"; // Disable clicks
        }
    }

    // Enable the board (allow moves again)
    function enableBoard() {
        for (const cell of board.children) {
            cell.style.pointerEvents = "auto"; // Enable clicks
        }
    }
});