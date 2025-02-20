import { useState } from "react";
import Modal from "./Modal";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
  const [gameBoard, setGameBoard] = useState(initialGameBoard);
  const [winner, setWinner] = useState(null);
  const [isDraw, setIsDraw] = useState(false);

  function checkWinner(board) {
    const winningCombinations = [
      // Rows
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      // Columns
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      // Diagonals
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    for (let combo of winningCombinations) {
      const [[a, b], [c, d], [e, f]] = combo;
      if (
        board[a][b] &&
        board[a][b] === board[c][d] &&
        board[a][b] === board[e][f]
      ) {
        return board[a][b]; // Return "X" or "O"
      }
    }
    return null;
  }

  function checkDraw(board) {
    return board.flat().every((cell) => cell !== null); // If all cells are filled
  }

  function handleSelectSquare(rowIndex, colIndex) {
    if (gameBoard[rowIndex][colIndex] !== null || winner || isDraw) {
      return; // Prevent move if occupied, winner exists, or it's a tie
    }

    const updatedBoard = gameBoard.map((row, rIdx) =>
      row.map((cell, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? activePlayerSymbol : cell
      )
    );

    const gameWinner = checkWinner(updatedBoard);
    if (gameWinner) {
      setWinner(gameWinner);
    } else if (checkDraw(updatedBoard)) {
      setIsDraw(true);
    }

    setGameBoard(updatedBoard);
    onSelectSquare();
  }

  function resetGame() {
    setGameBoard(initialGameBoard);
    setWinner(null);
    setIsDraw(false);
  }

  return (
    <div>
      {(winner || isDraw) && (
        <Modal
          message={winner ? `Winner: ${winner} 🎉` : "It's a Tie! 🤝"}
          onClose={resetGame}
        />
      )}

      <ol id="game-board">
        {gameBoard.map((row, rowIndex) => (
          <li key={rowIndex}>
            <ol>
              {row.map((playerSymbol, colIndex) => (
                <li key={colIndex}>
                  <button
                    disabled={playerSymbol !== null || winner !== null} // Disable button if occupied or game over
                    style={{
                      color:
                        playerSymbol === "X"
                          ? "#31c4be"
                          : playerSymbol === "O"
                          ? "#f2b237"
                          : "#3f3b00",
                    }}
                    onClick={() => handleSelectSquare(rowIndex, colIndex)}
                  >
                    {playerSymbol}
                  </button>
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ol>

      <div></div>
    </div>
  );
}
