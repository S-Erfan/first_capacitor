"use client";

import { Button } from "@/components/ui/button";
import { Circle, History, Home, X } from "lucide-react";
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

const checkWinner = (board: any[]) => {
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

const minimax = (
  newBoard: any[],
  player: "O" | "X"
): { index: number; score: number } => {
  const availSpots = newBoard.reduce(
    (acc, val, idx) => (val === null ? acc.concat(idx) : acc),
    []
  );
  const opponent = player === "O" ? "X" : "O";

  const winner = checkWinner(newBoard);
  if (winner === "O") return { score: 10, index: NaN };
  if (winner === "X") return { score: -10, index: NaN };
  if (winner === "tie") return { score: 0, index: NaN };

  const moves = [];
  for (let i = 0; i < availSpots.length; i++) {
    const move = {} as { index: number; score: number };
    move.index = availSpots[i];
    newBoard[availSpots[i]] = player;

    const result = minimax(newBoard, opponent);
    move.score = result.score;

    newBoard[availSpots[i]] = null;
    moves.push(move);
  }

  let bestMove: number = 0;
  if (player === "O") {
    let bestScore = -Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }

  return moves[bestMove];
};

export default function FriendPlay() {
  const [selectPlyer, setSelectPlayer] = useState(
    () => window && window.localStorage.getItem("player")
  );

  const [scoreGame, setScoreGame] = useState({ x: 0, o: 0 });
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [isComputer, setIsComputer] = useState(true);

  const handleClick = (index: number) => {
    console.log(selectPlyer, "hhh");
    const playerMark = selectPlyer == "0" ? "O" : "X";
    const playerMarkAI = selectPlyer != "0" ? "O" : "X";

    if (board[index] === null && currentPlayer === playerMark) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      setCurrentPlayer(playerMarkAI);
    }
  };

  const handleComputerMove = () => {
    const playerMark = selectPlyer == "0" ? "O" : "X";
    const playerMarkAI = selectPlyer != "0" ? "O" : "X";

    const newBoard = [...board];
    const bestMove = minimax(newBoard, playerMarkAI);
    newBoard[bestMove.index] = playerMarkAI;
    setBoard(newBoard);
    setCurrentPlayer(playerMark);
  };

  useEffect(() => {
    const playerMarkAI =
      window?.localStorage.getItem("player") != "0" ? "O" : "X";
    setSelectPlayer(window?.localStorage.getItem("player"));

    const winner = checkWinner(board);
    if (winner) {
      if (winner === "O") {
        setScoreGame((prevScore) => ({ ...prevScore, o: prevScore.o + 1 }));
      }
      if (winner === "X") {
        setScoreGame((prevScore) => ({ ...prevScore, x: prevScore.x + 1 }));
      }
      setTimeout(() => {
        setBoard(Array(9).fill(null));
        setCurrentPlayer("X");
      }, 1000);
    } else if (currentPlayer === playerMarkAI && isComputer) {
      setTimeout(handleComputerMove, 500);
    }
  }, [board, currentPlayer]);

  const handleReset = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
  };

  return (
    <>
      <section className="w-full h-full flex flex-col justify-center items-center">
        <nav className="flex justify-around items-center gap-6 mb-[4rem]">
          <span className="text-white flex gap-1 items-center">
            You{" "}
            {selectPlyer == "0" ? (
              <Circle className="text-blue-500" strokeWidth={3} />
            ) : (
              <X className="text-red-500" strokeWidth={3} />
            )}
          </span>
          <span className="rounded-lg bg-white px-4 py-1">
            {scoreGame[selectPlyer == "0" ? "o" : "x"]} -{" "}
            {scoreGame[selectPlyer == "0" ? "x" : "o"]}
          </span>
          <span className="text-white flex gap-1 items-center">
            AI{" "}
            {selectPlyer != "0" ? (
              <Circle className="text-blue-500" strokeWidth={3} />
            ) : (
              <X className="text-red-500" strokeWidth={3} />
            )}
          </span>
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
              onClick={() => handleClick(index)}
              disabled={
                cell !== null ||
                currentPlayer == (selectPlyer == "0" ? "X" : "O")
              }>
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
        <div className="mb-8 text-2xl font-bold text-gray-200">
          {checkWinner(board) === "tie"
            ? "It's a tie!"
            : !!checkWinner(board) && `Player ${checkWinner(board)} wins!`}
        </div>
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
