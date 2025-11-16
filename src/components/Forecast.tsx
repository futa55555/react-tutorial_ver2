/**
 * FIle: src/components/Forecast.tsx
 */

import { createPortal } from "react-dom";

import type { ForecastData } from "@/types/forecast";

type Props = {
  isLoading: boolean;
  forecastData: ForecastData | null;
  onClick: () => void;
};

export default function Forecast({ isLoading, forecastData, onClick }: Props) {
  const forecastRoot = document.getElementById("forecast-root");

  if (!forecastRoot) return null;

  return createPortal(
    <div className="forecast">
      <div className="forecast__view">
        {isLoading
          ? `読み込み中`
          : `${forecastData.dateLabel}の天気: ${forecastData?.temperature.min} ~ ${forecastData?.temperature.max}`}
      </div>
      <button className="forecast__toggle" onClick={onClick}>
        Reload
      </button>
    </div>,
    forecastRoot
  );
}
