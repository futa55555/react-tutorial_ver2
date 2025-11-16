/**
 * File: src/pages/App.tsx
 */

import "@/App.css";

import { useState } from "react";

import ReactLogo from "@/assets/react.svg";

import { useGameStore } from "@/stores/gameStore";

import useForecast from "@/hooks/useForecast";

import Header from "@/components/Header";
import BasicButton from "@/components/Common/BasicButton";
import Forecast from "@/components/Forecast";
import MyPortal from "@/components/MyPortal";
import Tab from "@/components/Tab";

export default function App() {
  const {
    gameList,
    getCurrentGame,
    getCurrentHistory,
    getNextPlayer,
    onClickSquare,
    createNewGame,
    restoreMove,
    restoreGame,
  } = useGameStore();
  const currentGame = getCurrentGame();
  const currentHistory = getCurrentHistory();
  const nextPlayer = getNextPlayer();

  const { isLoading, data: forecastData, mutate } = useForecast();

  const [tabStatus, setTabStatus] = useState<"form" | "play" | "history">(
    "play"
  );
  const [isModalView, setIsModalView] = useState<boolean>(false);

  return (
    <>
      <Header isModalView={isModalView} setIsModalView={setIsModalView} />
      <main className="main">
        <BasicButton
          onClick={() => {
            createNewGame();
            setTabStatus("play");
            mutate();
          }}
        >
          New Game
        </BasicButton>
        <Tab
          gameList={gameList}
          currentGame={currentGame}
          currentHistory={currentHistory}
          nextPlayer={nextPlayer}
          onClickSquare={onClickSquare}
          restoreMove={restoreMove}
          restoreGame={restoreGame}
          tabStatus={tabStatus}
          setTabStatus={setTabStatus}
        />
      </main>
      <MyPortal isModalView={isModalView}>
        <img src={ReactLogo} className="portal-image" />
      </MyPortal>
      <Forecast
        isLoading={isLoading}
        forecastData={forecastData}
        onClick={mutate}
      />
    </>
  );
}
