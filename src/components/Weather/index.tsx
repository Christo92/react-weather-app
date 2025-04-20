
import React, { useState, useEffect } from "react";
import { useWeather } from "../../hooks/useWeather";
import WeatherInfo from "../../components/WeatherInfo";
import DailyForecast from "../../components/DailyForecast";
import SearchBar from "../../components/SearchBar";
import { motion } from "framer-motion";
import './index.css'

/**
 * `Weather` component displays the current weather, including temperature, humidity, and a 5-day forecast.
 * It also includes a toggle for dark mode, and a search bar to enter a city.
 * The component uses custom CSS for layout and style.
 *
 * @component
 * @example
 * <Weather />
 *
 * @returns {JSX.Element} A `div` element containing the weather details and forecast.
 */
const Weather = () => {
  const [city, setCity] = useState("Paris");
  const { data, isLoading, isError } = useWeather(city);

  // Dark mode state management
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const userPreference = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(userPreference);
    if (userPreference) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, []);

  // Toggle dark mode and update localStorage
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("darkMode", newMode.toString());
      if (newMode) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
      return newMode;
    });
  };

  return (
    <div className={`weather-container ${isDarkMode ? 'dark' : ''}`}>
      {/* Dark mode toggle button */}
      <button
        onClick={toggleDarkMode}
        className="dark-mode-toggle"
      >
        {isDarkMode ? "🌙" : "☀️"}
      </button>

      <SearchBar onSearch={setCity} />

      {isLoading ? (
        <motion.div
          className="loading-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Loading...
        </motion.div>
      ) : isError ? (
        <div className="error-text">Error loading weather data.</div>
      ) : (
        data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="weather-content"
          >
            {/* Weather Info */}
            <WeatherInfo {...data.current} />

            {/* Daily Forecast */}
            {Array.isArray(data.daily) && <DailyForecast data={data.daily} />}
          </motion.div>
        )
      )}
    </div>
  );
};

export default Weather;
