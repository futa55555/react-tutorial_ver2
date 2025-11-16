/**
 * File: src/hooks/useForecast.tsx
 */

import { useState, useEffect } from "react";

import type { ForecastData } from "@/types/forecast";

export default function useForecast() {
  const [forecastToggle, setForecastToggle] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);

  useEffect(() => {
    setIsLoading(true);

    fetch("https://weather.tsukumijima.net/api/forecast?city=130010")
      .then((res) => res.json())
      .then((json) => {
        const today = json?.forecasts[0];
        setForecastData({
          dateLabel: today.dateLabel,
          temperature: {
            min: today.temperature.min.celsius,
            max: today.temperature.max.celsius,
          },
        });
      })
      .finally(() => setIsLoading(false));
  }, [forecastToggle]);

  return {
    isLoading,
    forecastData,
    setForecastToggle,
  };
}
