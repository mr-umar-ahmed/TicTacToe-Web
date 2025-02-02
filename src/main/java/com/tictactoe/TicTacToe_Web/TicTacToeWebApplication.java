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
		return "Move successful!";
	}

	// POST endpoint to reset the game
	@PostMapping("/api/reset-game")
	public String resetGame() {
		gameState.clear();
		return "Game reset!";
	}
}