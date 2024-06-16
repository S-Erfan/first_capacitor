"use client";

import React, { useState } from "react";

const Playground = () => {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");

  const handleClick = (index: number) => {
    if (board[index] === null) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
  };

  const checkWinner = () => {
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
    for (let i = 0; i < winningLines.length; i++) {
      const [a, b, c] = winningLines[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    if (!board.includes(null)) {
      return "tie";
    }
    return null;
  };

  const winner = checkWinner();

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`w-20 h-20 bg-white dark:bg-gray-800 rounded-md text-4xl font-bold flex items-center justify-center cursor-pointer transition-colors ${
              cell === "X"
                ? "text-red-500 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-900"
                : "text-blue-500 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-900"
            }`}
            onClick={() => handleClick(index)}>
            {cell}
          </button>
        ))}
      </div>
    </>
  );
};

export default Playground;
