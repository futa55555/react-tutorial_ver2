/**
 * File: src/components/Tab.tsx
 */

import type { History, Game } from "@/types/game";

import FormField from "@/components/FormField";
import HistoryField from "@/components/HistoryField";
import PlayField from "@/components/PlayField";

type Props = {
  history: History;
  game: Game;
  gameList: Game[];
  nextPlayer: string;
  onClickSquare: (i: number) => void;
  restoreMove: (i: number) => void;
  restoreGame: (i: number) => void;
  tabStatus: "form" | "play" | "history";
  setTabStatus: (value: "form" | "play" | "history") => void;
};

export default function Tab({
  history,
  game,
  gameList,
  nextPlayer,
  onClickSquare,
  restoreMove,
  restoreGame,
  tabStatus,
  setTabStatus,
}: Props) {
  return (
    <div className="tab">
      <div className="tab__switcher">
        <button
          className={`tab__item ${
            tabStatus === "form" ? "tab__item--active" : ""
          }`}
          onClick={() => setTabStatus("form")}
        >
          Form
        </button>
        <button
          className={`tab__item ${
            tabStatus === "play" ? "tab__item--active" : ""
          }`}
          onClick={() => setTabStatus("play")}
        >
          Play
        </button>
        <button
          className={`tab__item ${
            tabStatus === "history" ? "tab__item--active" : ""
          }`}
          onClick={() => setTabStatus("history")}
        >
          History
        </button>
      </div>
      <div className="tab__field">
        {(() => {
          switch (tabStatus) {
            case "form":
              return <FormField />;
            case "play":
              return (
                <PlayField
                  history={history}
                  game={game}
                  nextPlayer={nextPlayer}
                  onClickSquare={onClickSquare}
                  restoreMove={restoreMove}
                />
              );
            case "history":
              return (
                <HistoryField
                  gameList={gameList}
                  restoreGame={restoreGame}
                  setTabStatus={setTabStatus}
                />
              );
          }
        })()}
      </div>
    </div>
  );
}
