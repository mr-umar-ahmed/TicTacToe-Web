document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
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
            .then(message => {
                if (message === "Move successful!") {
                    cell.textContent = currentPlayer;
                    cell.classList.add(currentPlayer); // Add class for styling
                    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
                } else {
                    alert(message); // Show error message (e.g., "Position already taken!")
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
            });
    });
});