"use client";

import { Button } from "@/components/ui/button";
import { History, Home } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { type: "spring", duration: 0.3, bounce: 0 },
        opacity: { duration: 0.01 },
      },
    };
  },
};

export default function FriendPlay() {
  const [scoreGame, setScoreGame] = useState({ x: 0, o: 0 });

  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
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

  useEffect(() => {
    if (winner === "O") {
      setScoreGame({ ...scoreGame, o: ++scoreGame.o });
    }
    if (winner === "X") {
      setScoreGame({ ...scoreGame, x: ++scoreGame.x });
    }

    if (winner) {
      setTimeout(handleReset, 1000);
    }
  }, [winner]);

  return (
    <>
      <section className="w-full h-full flex flex-col justify-center items-center">
        <nav className="flex justify-around items-center gap-6 mb-[4rem]">
          <span className="text-white">Player X</span>
          <span className="rounded-lg bg-white px-4 py-1">
            {scoreGame.x} - {scoreGame.o}
          </span>
          <span className="text-white">Player O</span>
        </nav>
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
              {cell === "O" ? (
                <motion.svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  initial="hidden"
                  animate="visible">
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="25"
                    stroke="rgb(59 130 246)"
                    variants={draw}
                    custom={1}
                    strokeWidth={"10px"}
                    strokeLinecap={"round"}
                    fill={"transparent"}
                  />
                </motion.svg>
              ) : cell === "X" ? (
                <motion.svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  initial="hidden"
                  animate="visible">
                  <motion.line
                    x1="15"
                    y1="15"
                    x2="65"
                    y2="65"
                    stroke="#ff0055"
                    custom={0.3}
                    variants={draw}
                    strokeWidth={"10px"}
                    strokeLinecap={"round"}
                    fill={"transparent"}
                  />
                  <motion.line
                    x1="65"
                    y1="15"
                    x2="15"
                    y2="65"
                    stroke="#ff0055"
                    custom={0.6}
                    variants={draw}
                    strokeWidth={"10px"}
                    strokeLinecap={"round"}
                    fill={"transparent"}
                  />
                </motion.svg>
              ) : null}
            </button>
          ))}
        </div>
        {winner && (
          <div className="mb-8 text-2xl font-bold text-gray-200">
            {winner === "tie" ? "It's a tie!" : `Player ${winner} wins!`}
          </div>
        )}
        <div className="mt-[10vh] flex flex-col mx-auto justify-center items-center gap-4 w-[calc(100%-15vw)] max-w-[320px] [&>button]:!text-xl">
          <div className="w-full flex justify-start items-center gap-3">
            <Button
              onClick={handleReset}
              variant={"outline"}
              size="icon"
              className="w-fit bg-transparent text-border hover:bg-primary/90 py-6 px-3 hover:border-primary/90 hover:text-orange-400">
              <History />
            </Button>
            <Button
              onClick={() => {
                handleReset();
                setScoreGame({ x: 0, o: 0 });
              }}
              variant={"outline"}
              className="w-full bg-transparent text-border hover:bg-primary/90 py-6 hover:border-primary/90 hover:text-orange-400">
              Restart
            </Button>
          </div>
          <Button className="w-full mt-3 bg-white text-orange-400 py-6" asChild>
            <Link href={"/"} className="text-xl flex items-center gap-2">
              <Home /> Home
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
