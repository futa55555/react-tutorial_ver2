/**
 * File: src/components/History.tsx
 */

import type { Game } from "@/types/game";

type Props = {
  gameList: Game[];
  restoreGame: (i: number) => void;
  setTabStatus: (value: "play" | "history") => void;
};

export default function HistoryField({
  gameList,
  restoreGame,
  setTabStatus,
}: Props) {
  function calcNextPlayer(round: number): string {
    return round % 2 === 0 ? "O" : "X";
  }
  return (
    <div className="history-field">
      <h2 className="history-field__header">Game History</h2>
      <ol className="history-field__list">
        {gameList.map((game) => {
          return (
            <li key={game.id}>
              <button
                className="history-field__item"
                onClick={() => {
                  restoreGame(game.id);
                  setTabStatus("play");
                }}
              >
                {game.histories.at(-1)?.winner
                  ? `Finished! Winner: ${game.histories.at(-1)!.winner}`
                  : `Ongoing! Round: ${
                      game.histories.length
                    }, Next player: ${calcNextPlayer(game.histories.length)}`}
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
