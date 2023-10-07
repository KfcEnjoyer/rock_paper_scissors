// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract RockPaperScissors {
    enum Move { None, Rock, Paper, Scissors }
    
    struct Game {
        address player;
        Move playerMove;
        Move botMove;
        bool resolved;
        uint256 betAmount;
    }

    mapping(address => Game[]) public gameHistory;
    mapping(address => uint256) public gameCount; // Added gameCount mapping

    event GameResult(address indexed player, Move playerMove, Move botMove, bool won, uint256 betAmount);

    function play(uint8 move) external payable {
        require(move >= uint8(Move.Rock) && move <= uint8(Move.Scissors), "Invalid move");
        require(msg.value == 0.0001 ether, "Incorrect bet amount");

        Move botMove = Move(uint256(keccak256(abi.encodePacked(block.timestamp, block.difficulty, msg.sender))) % 3 + 1);
        bool playerWon = determineWinner(Move(move), botMove);

        gameHistory[msg.sender].push(Game(msg.sender, Move(move), botMove, true, msg.value));
        gameCount[msg.sender]++; // Increment game count
        
        if (playerWon) {
            payable(msg.sender).transfer(msg.value * 2); // Player wins double the bet
        }
        
        emit GameResult(msg.sender, Move(move), botMove, playerWon, msg.value);
    }

    function getUserGames(address user) external view returns (Game[] memory) {
        return gameHistory[user];
    }

    function getGameCount(address user) external view returns (uint256) {
        return gameCount[user];
    }

    function determineWinner(Move playerMove, Move botMove) internal pure returns (bool) {
        if (playerMove == botMove) {
            return false; // It's a draw
        } else if (
            (playerMove == Move.Rock && botMove == Move.Scissors) ||
            (playerMove == Move.Paper && botMove == Move.Rock) ||
            (playerMove == Move.Scissors && botMove == Move.Paper)
        ) {
            return true; // Player wins
        } else {
            return false; // Bot wins
        }
    }
}
