document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    const message = document.getElementById("message");
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
                    winSound.play();
                    const winner = result.split(": ")[1];
                    const winningCombination = checkWinningCombination(winner);
                    highlightWinningCells(winningCombination);
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
        resetSound.play();
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

    // Helper function to check the winning combination
    function checkWinningCombination(player) {
        const winningCombinations = [
            [0, 1, 2], // Row 1
            [3, 4, 5], // Row 2
            [6, 7, 8], // Row 3
            [0, 3, 6], // Column 1
            [1, 4, 7], // Column 2
            [2, 5, 8], // Column 3
            [0, 4, 8], // Diagonal 1
            [2, 4, 6]  // Diagonal 2
        ];

        for (const combination of winningCombinations) {
            const [a, b, c] = combination;
            if (
                board.children[a].textContent === player &&
                board.children[b].textContent === player &&
                board.children[c].textContent === player
            ) {
                return combination;
            }
        }
        return null;
    }

    // Highlight the winning cells
    function highlightWinningCells(combination) {
        if (combination) {
            combination.forEach(index => {
                board.children[index].classList.add("winner");
            });
        }
    }

    // Toggle Dark Mode
    document.getElementById("theme-toggle").addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    // Sound Effects
    const winSound = new Audio('win.mp3');
    const resetSound = new Audio('reset.mp3');
});