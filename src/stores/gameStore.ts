/**
 * File: src/stores/gameStore.ts
 */

import { create } from "zustand";

import type { History, Game } from "@/types/game";

import checkWinner from "@/utils/checkWinner";

type GameState = {
  gameList: Game[];
  currentGameId: number;
  currentRound: number;

  getCurrentGame: () => Game;
  getCurrentHistory: () => History;
  getNextPlayer: () => string;

  createNewGame: () => void;
  onClickSquare: (i: number) => void;
  restoreMove: (round: number) => void;
  restoreGame: (gameId: number) => void;
};

export const useGameStore = create<GameState>((set, get) => ({
  gameList: [
    {
      id: 0,
      histories: [
        {
          winner: "",
          squares: Array(9).fill(""),
        },
      ],
    },
  ],
  currentGameId: 0,
  currentRound: 1,

  getCurrentGame() {
    const { gameList, currentGameId } = get();
    return gameList[currentGameId];
  },

  getCurrentHistory() {
    const { currentRound } = get();
    const currentGame = get().getCurrentGame();
    return currentGame.histories[currentRound - 1];
  },

  getNextPlayer() {
    const { currentRound } = get();
    return currentRound % 2 === 0 ? "O" : "X";
  },

  createNewGame: () => {
    const { gameList } = get();

    const newGameId = gameList.length;
    const initSquares = Array(9).fill("");

    const initHistory: History = {
      squares: initSquares,
      winner: "",
    };

    const newGame: Game = {
      id: newGameId,
      histories: [initHistory],
    };

    set({
      gameList: [...gameList, newGame],
      currentGameId: newGameId,
      currentRound: 1,
    });
  },

  onClickSquare: (i: number) => {
    const { gameList, currentGameId, currentRound } = get();
    const currentGame: Game = get().getCurrentGame();
    const curerntHistory: History = get().getCurrentHistory();
    const nextPlayer: string = get().getNextPlayer();

    const latestHistory =
      currentGame.histories[currentGame.histories.length - 1];
    if (latestHistory.winner || latestHistory.squares[i]) return;

    const newSquares = curerntHistory.squares.slice();
    newSquares[i] = nextPlayer;

    const newWinner = checkWinner(newSquares);

    const newHistory: History = {
      winner: newWinner,
      squares: newSquares,
    };
    const newHistories: History[] = [
      ...currentGame.histories.slice(0, currentRound),
      newHistory,
    ];

    const newGame: Game = {
      id: currentGameId,
      histories: newHistories,
    };
    const newGameList = gameList.slice();
    newGameList[currentGameId] = newGame;

    set({
      gameList: newGameList,
      currentRound: currentRound + 1,
    });
  },

  restoreMove: (round: number) => {
    set({
      currentRound: round,
    });
  },

  restoreGame: (gameId: number) => {
    set({
      currentGameId: gameId,
    });
  },
}));
