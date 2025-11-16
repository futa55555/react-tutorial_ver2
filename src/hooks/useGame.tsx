/**
 * File: src/hooks/useGame.tsx
 */

import type { History, Game } from "@/types/game";

import { useState, useEffect } from "react";

import checkWinner from "@/utils/checkWinner";

export default function useGame() {
  const [gameId, setGameId] = useState<number>(1);
  const [round, setRound] = useState<number>(1);
  const [squares, setSquares] = useState<string[]>(Array(9).fill(""));
  const [winner, setWinner] = useState<string>("");
  const [histories, setHistories] = useState<History[]>([
    {
      squares: Array(9).fill(""),
      winner: "",
    },
  ]);
  const [gameList, setGameList] = useState<Game[]>([]);

  const nextPlayer: string = round % 2 === 0 ? "O" : "X";
  const history: History = {
    squares: squares,
    winner: winner,
  };
  const game: Game = {
    id: gameId,
    histories: histories,
  };

  // onMountedでcreateNewGame
  useEffect(() => {
    createNewGame();
  }, []);

  function onClickSquare(i: number): void {
    if (winner || squares[i]) return;

    // 盤面更新
    const newSquares = squares.slice();
    newSquares[i] = nextPlayer;
    setSquares(newSquares);

    // 勝者更新
    const newWinner = checkWinner(newSquares);
    setWinner(newWinner);

    // move-history更新
    const newHistory: History = {
      squares: newSquares,
      winner: newWinner,
    };
    const newHistories = [...histories.slice(0, round), newHistory];
    setHistories(newHistories);

    // round更新
    setRound((round) => round + 1);

    // game-history更新
    const newGame = {
      id: gameId,
      histories: newHistories,
    };
    const newGameList = gameList.slice();
    newGameList[gameId - 1] = newGame;
    setGameList(newGameList);
  }

  function createNewGame() {
    // gameId更新
    const newGameId = gameList.length + 1;
    setGameId(newGameId);

    // round, squares, winner, histories初期化
    const initSquares = Array(9).fill("");
    const initHistory = {
      squares: initSquares,
      winner: "",
    };
    setRound(1);
    setSquares(initSquares);
    setWinner("");
    setHistories([initHistory]);

    // game-history更新
    const newGame = {
      id: newGameId,
      histories: [initHistory],
    };
    setGameList([...gameList, newGame]);
  }

  function restoreMove(i: number): void {
    const history = histories[i];

    setRound(i + 1);
    setSquares(history.squares);
    setWinner(history.winner);
  }

  function restoreGame(i: number): void {
    const game = gameList[i - 1];

    setGameId(game.id);
    setRound(game.histories.length);
    setSquares(game.histories.at(-1)?.squares || Array(9).fill(""));
    setWinner(game.histories.at(-1)?.winner || "");
    setHistories(game.histories);
  }

  return {
    history,
    game,
    gameList,
    nextPlayer,
    onClickSquare,
    createNewGame,
    restoreMove,
    restoreGame,
  };
}
