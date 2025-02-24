import { useState, useRef } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import ConfirmModal from "./components/ConfirmModal";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [firstPlayerWins, setFirstPlayerWins] = useState(0);
  const [secondPlayerWins, setSecondPlayerWins] = useState(0);
  const [ties, setTies] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [player1Name, setPlayer1Name] = useState("Player 1");
  const [player2Name, setPlayer2Name] = useState("Player 2");

  // Create a reference to call resetGame from GameBoard
  const gameBoardRef = useRef(null);

  function handleSelectSquare() {
    setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));
  }

  function handleRestart() {
    setShowConfirmModal(true); // Show confirmation modal
  }

  function confirmRestart() {
    setShowConfirmModal(false); // Close modal
    setFirstPlayerWins(0);
    setSecondPlayerWins(0);
    setTies(0);
    //setGameKey((prevKey) => prevKey + 1); // Force reset
    setActivePlayer("X");
    if (gameBoardRef.current) {
      gameBoardRef.current.resetGame();
    }
  }

  function cancelRestart() {
    setShowConfirmModal(false); // Close modal without resetting
  }

  function updateScores(winner) {
    if (winner === "X") {
      setFirstPlayerWins((prev) => prev + 1);
      setActivePlayer("X");
    } else if (winner === "O") {
      setSecondPlayerWins((prev) => prev + 1);
      setActivePlayer("X");
    } else {
      setTies((prev) => prev + 1);
      setActivePlayer("X");
    }
  }

  return (
    <div className="main-app">
      <p className="game-title">Tic React Toe</p>
      <div className="players-wrapper">
        <ol id="players" className="highlight-player">
          <Player
            initialName={player1Name}
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={setPlayer1Name}
          />
          <Player
            initialName={player2Name}
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={setPlayer2Name}
          />
        </ol>
        <div className="turn-indicator">{activePlayer} Turn</div>
        <button className="restart-button" onClick={handleRestart}>
          Restart Game
        </button>
      </div>
      <GameBoard
        onSelectSquare={handleSelectSquare}
        activePlayerSymbol={activePlayer}
        updateScores={updateScores}
        setActivePlayer={setActivePlayer}
        player1Name={player1Name}
        player2Name={player2Name}
      />
      <div>
        <ol id="summaries">
          <li>
            <div className="info-box first-player-wins">
              <p className="wins-text">X Wins</p>
              <p className="wins-number">{firstPlayerWins}</p>
            </div>
          </li>
          <li>
            <div className="info-box ties">
              <p className="wins-text"> Ties</p>
              <p className="wins-number">{ties}</p>
            </div>
          </li>
          <li>
            <div className="info-box second-player-wins">
              <p className="wins-text">O Wins</p>
              <p className="wins-number">{secondPlayerWins}</p>
            </div>
          </li>
        </ol>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          message="Are you sure you want to restart the game?"
          onConfirm={confirmRestart}
          onCancel={cancelRestart}
        />
      )}
    </div>
  );
}

export default App;
