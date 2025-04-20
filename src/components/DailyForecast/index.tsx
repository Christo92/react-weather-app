import React from "react";
import clearIcon from "../../assets/clear.png";
import cloudIcon from "../../assets/cloud.png";
import drizzleIcon from "../../assets/drizzle.png";
import rainIcon from "../../assets/rain.png";
import snowIcon from "../../assets/snow.png";
import './index.css';

const allIcons: Record<string, string> = {
  "01d": clearIcon,
  "01n": clearIcon,
  "02d": cloudIcon,
  "02n": cloudIcon,
  "03d": cloudIcon,
  "03n": cloudIcon,
  "04d": drizzleIcon,
  "04n": drizzleIcon,
  "09d": rainIcon,
  "09n": rainIcon,
  "10d": rainIcon,
  "10n": rainIcon,
  "13d": snowIcon,
  "13n": snowIcon,
};

interface DailyForecastProps {
  data: Array<{
    date: string;
    temp: number;
    icon: string;
  }>;
}

/**
 * `DailyForecast` component displays a 5-day weather forecast.
 * Each day includes the date, temperature, and a corresponding weather icon.
 * The layout adjusts responsively based on screen size, and applies dark theme for temperatures below 0°C.
 *
 * @component
 * @example
 * const forecastData = [
 *   { date: "2025-04-21", temp: 20, icon: "01d" },
 *   { date: "2025-04-22", temp: 18, icon: "02d" },
 *   { date: "2025-04-23", temp: 15, icon: "03d" },
 *   { date: "2025-04-24", temp: 10, icon: "09d" },
 *   { date: "2025-04-25", temp: -1, icon: "13d" }
 * ];
 * <DailyForecast data={forecastData} />
 *
 * @param {Array<{ date: string, temp: number, icon: string }>} data - Forecast data for 5 days.
 *
 * @returns {JSX.Element} A `div` element containing a 5-day weather forecast grid.
 */
const DailyForecast: React.FC<DailyForecastProps> = ({ data = [] }) => {
  return (
    <div className="forecast-container">
      <h3 className="forecast-title">Prévisions sur 5 jours</h3>
      <div className="forecast-grid">
        {data.map((day, index) => (
          <div key={index} className="forecast-day">
            <p>{day.date}</p>
            <img src={allIcons[day.icon] || clearIcon} alt="weather icon" />
            <p className="temp">{day.temp}°C</p>
          </div>
        ))}
      </div>
    </div>
  );
};


export default DailyForecast;
