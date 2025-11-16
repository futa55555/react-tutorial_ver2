/**
 * File: src/components/PlayField.tsx
 */

import type { History, Game } from "@/types/game";

import MoveHistory from "@/components/MoveHistory";
import Square from "@/components/Square";

type Props = {
  history: History;
  game: Game;
  nextPlayer: string;
  onClickSquare: (i: number) => void;
  restoreMove: (i: number) => void;
};

export default function PlayField({
  history,
  game,
  nextPlayer,
  onClickSquare,
  restoreMove,
}: Props) {
  return (
    <div className="play-field">
      <div className="play-field__board">
        <h3 className="play-field__header">
          {history.winner
            ? `Winner: ${history.winner}`
            : `Next player: ${nextPlayer}`}
        </h3>
        <div className="play-field__grid">
          {history.squares.map((square, index) => {
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
      <MoveHistory game={game} restoreMove={restoreMove} />
    </div>
  );
}
