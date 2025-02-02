document.addEventListener("DOMContentLoaded", () => {
    const board = document.getElementById("game-board");
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleCellClick);
        board.appendChild(cell);
    }
});

function handleCellClick(event) {
    const cell = event.target;
    if (cell.textContent === "") {
        cell.textContent = "X"; // Replace with logic for player turns
    }
}