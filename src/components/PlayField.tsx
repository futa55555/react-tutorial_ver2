/**
 * File: src/components/PlayField.tsx
 */

import type { History, Game } from "@/types/game";

import MoveHistory from "@/components/MoveHistory";
import Square from "@/components/Square";

type Props = {
  currentGame: Game;
  currentHistory: History;
  nextPlayer: string;
  onClickSquare: (i: number) => void;
  restoreMove: (i: number) => void;
};

export default function PlayField({
  currentGame,
  currentHistory,
  nextPlayer,
  onClickSquare,
  restoreMove,
}: Props) {
  return (
    <div className="play-field">
      <div className="play-field__board">
        <h3 className="play-field__header">
          {currentHistory.winner
            ? `Winner: ${currentHistory.winner}`
            : `Next player: ${nextPlayer}`}
        </h3>
        <div className="play-field__grid">
          {currentHistory.squares.map((square, index) => {
            return (
              <Square
                key={index}
                square={square}
                onClick={() => onClickSquare(index)}
              />
            );
          })}
        </div>
      </div>
      <MoveHistory currentGame={currentGame} restoreMove={restoreMove} />
    </div>
  );
}
