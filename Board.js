import React from "react";

function Board({ squares, onSquareClick }) {
  return (
    <table>
      <tbody>
        {[0, 1, 2].map((row) => (
          <tr key={row}>
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <td key={col} onClick={() => onSquareClick(index)}>
                  {squares[index]}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Board;
