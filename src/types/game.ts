/**
 * File: src/types/game.ts
 */

export type History = {
  squares: string[];
  winner: string;
};

export type Game = {
  id: number;
  histories: History[];
};
