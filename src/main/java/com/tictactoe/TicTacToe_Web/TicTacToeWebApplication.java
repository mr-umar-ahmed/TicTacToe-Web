package com.tictactoe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@SpringBootApplication
@RestController
public class TicTacToeWebApplication {

	// Store the game state as a map (position -> player symbol)
	private final Map<Integer, String> gameState = new HashMap<>();

	public static void main(String[] args) {
		SpringApplication.run(TicTacToeWebApplication.class, args);
	}

	// GET endpoint to retrieve the current game state
	@GetMapping("/api/game-state")
	public Map<Integer, String> getGameState() {
		return gameState;
	}

	// POST endpoint to make a move
	@PostMapping("/api/make-move")
	public String makeMove(@RequestParam int position, @RequestParam String player) {
		if (gameState.containsKey(position)) {
			return "Position already taken!";
		}
		gameState.put(position, player);

		// Check for a winner
		String winner = checkForWinner();
		if (winner != null) {
			return "Winner: " + winner;
		}

		// Check for a draw
		if (gameState.size() == 9) {
			return "Draw!";
		}

		return "Move successful!";
	}

	// POST endpoint to reset the game
	@PostMapping("/api/reset-game")
	public String resetGame() {
		gameState.clear();
		return "Game reset!";
	}

	// Helper method to check for a winner
	private String checkForWinner() {
		int[][] winningCombinations = {
				{0, 1, 2}, // Row 1
				{3, 4, 5}, // Row 2
				{6, 7, 8}, // Row 3
				{0, 3, 6}, // Column 1
				{1, 4, 7}, // Column 2
				{2, 5, 8}, // Column 3
				{0, 4, 8}, // Diagonal 1
				{2, 4, 6}  // Diagonal 2
		};

		for (int[] combination : winningCombinations) {
			String player = gameState.get(combination[0]);
			if (player != null &&
					player.equals(gameState.get(combination[1])) &&
					player.equals(gameState.get(combination[2]))) {
				return player; // Return the winning player ("X" or "O")
			}
		}

		return null; // No winner yet
	}
}