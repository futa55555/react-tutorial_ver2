/**
 * File: src/components/MoveHistory.tsx
 */

import type { Game } from "@/types/game";

type Props = {
  currentGame: Game;
  restoreMove: (i: number) => void;
};

export default function MoveHistory({ currentGame, restoreMove }: Props) {
  return (
    <div className="move-history">
      <h3 className="move-history__header">Move History</h3>
      <ol className="move-history__list">
        {currentGame.histories.map((_, index) => {
          return (
            <li key={index}>
              <button
                className="move-history__item"
                onClick={() => {
                  restoreMove(index + 1);
                }}
              >
                {index === 0 ? `Go to game start` : `Go to move #${index}`}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
