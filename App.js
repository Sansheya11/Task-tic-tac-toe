import React, { useState } from "react";
import "./index.css";

function App() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const calculateWinner = (squares) => {
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a], lineIndex: i };
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[index] = isXNext ? "X" : "O";
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const winnerInfo = calculateWinner(squares);
  const winner = winnerInfo?.winner;
  const winningLineIndex = winnerInfo?.lineIndex;

  const status = winner
    ? `Winner: ${winner}`
    : squares.includes(null)
    ? `Next player: ${isXNext ? "X" : "O"}`
    : "It's a draw!";

  const lineClasses = [
    "horizTop",
    "horizMid",
    "horizBtm",
    "vertL",
    "vertM",
    "vertR",
    "diagL",
    "diagR",
  ];

  return (
    <div>
      <h1 id="game-header">Tic Tac Toe</h1>
      <div id="turn-indicator">{status}</div>
      <div style={{ position: "relative", marginTop: "1em" }}>
        <table>
          <tbody>
            {[0, 1, 2].map((row) => (
              <tr key={row}>
                {[0, 1, 2].map((col) => {
                  const index = row * 3 + col;
                  return (
                    <td key={col} onClick={() => handleClick(index)}>
                      {squares[index]}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {winner && (
          <svg
            viewBox="0 0 300 300"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            <line
              className={`drawLine ${lineClasses[winningLineIndex]}`}
              x1="0"
              y1="0"
              x2="300"
              y2="0"
            />
          </svg>
        )}
      </div>
      <button id="replay-button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default App;
