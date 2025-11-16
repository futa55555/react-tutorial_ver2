/**
 * File: src/types/forecast.ts
 */

type Temperature = {
  min: string;
  max: string;
};

export type ForecastData = {
  dateLabel: string;
  temperature: Temperature;
};
