/**
 * File: src/hooks/useGame.tsx
 */

import type { History, Game } from "@/types/game";

import { useState, useEffect } from "react";

import checkWinner from "@/utils/checkWinner";

export default function useGame() {
  const [gameList, setGameList] = useState<Game[]>([
    {
      id: 0,
      histories: [
        {
          winner: "",
          squares: Array(9).fill(""),
        },
      ],
    },
  ]);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [currentGameId, setCurrentGameId] = useState<number>(0);

  // onMountedでcreateNewGame
  useEffect(() => {
    createNewGame();
    setCurrentGameId(1);
  }, []);

  const currentGame: Game = gameList[currentGameId];
  const latestHistory: History = currentGame.histories[currentRound - 1];
  const nextPlayer: string = currentRound % 2 === 0 ? "O" : "X";

  function onClickSquare(i: number): void {
    const winner = latestHistory.winner;
    const squares = latestHistory.squares;

    if (winner || squares[i]) return;

    // 盤面更新
    const newSquares = squares.slice();
    newSquares[i] = nextPlayer;

    // 勝者更新
    const newWinner = checkWinner(newSquares);

    // move-history更新
    const newHistory: History = {
      winner: newWinner,
      squares: newSquares,
    };
    const newHistories = [
      ...currentGame.histories.slice(0, currentRound),
      newHistory,
    ];

    // game-list更新
    const newGame: Game = {
      id: currentGameId,
      histories: newHistories,
    };
    const newGameList = gameList.slice();
    newGameList[currentGameId] = newGame;
    setGameList(newGameList);

    // round更新
    setCurrentRound((currentRound) => currentRound + 1);
  }

  function createNewGame() {
    // gameId更新
    const newGameId = gameList.length;
    setCurrentGameId(newGameId);

    // round更新
    setCurrentRound(1);

    // game-history更新
    const initSquares = Array(9).fill("");
    const initHistory = {
      winner: "",
      squares: initSquares,
    };
    const newGame = {
      id: newGameId,
      histories: [initHistory],
    };
    setGameList([...gameList, newGame]);
  }

  function restoreMove(round: number): void {
    setCurrentRound(round);
  }

  function restoreGame(gameId: number): void {
    setCurrentGameId(gameId);

    const game = gameList[gameId];
    setCurrentRound(game.histories.length);
  }

  return {
    gameList,
    currentGame,
    latestHistory,
    nextPlayer,
    onClickSquare,
    createNewGame,
    restoreMove,
    restoreGame,
  };
}
