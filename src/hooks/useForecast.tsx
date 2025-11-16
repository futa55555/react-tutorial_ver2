/**
 * File: src/hooks/useForecast.tsx
 */

import { useState, useEffect } from "react";

import type { ForecastData } from "@/types/forecast";

export default function useForecast() {
  const [version, setVersion] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<ForecastData | null>(null);

  function mutate() {
    setVersion((v) => v + 1);
  }

  useEffect(() => {
    setIsLoading(true);

    fetch("https://weather.tsukumijima.net/api/forecast?city=130010")
      .then((res) => res.json())
      .then((json) => {
        const today = json?.forecasts[0];
        setData({
          dateLabel: today.dateLabel,
          temperature: {
            min: today.temperature.min.celsius,
            max: today.temperature.max.celsius,
          },
        });
      })
      .finally(() => setIsLoading(false));
  }, [version]);

  return {
    isLoading,
    data,
    mutate,
  };
}
