import React, { useState, useEffect } from "react";
import { useWeather } from "../../hooks/useWeather";
import WeatherInfo from "../../components/WeatherInfo";
import DailyForecast from "../../components/DailyForecast";
import SearchBar from "../../components/SearchBar";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import "./index.css";

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
  const { data, isLoading, isError, error } = useWeather(city);

  // Dark mode state management
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isError && error instanceof Error) {
      toast.error(error.message);
    }
  }, [isError, error]);

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
    <div className={`weather-container ${isDarkMode ? "dark" : ""}`}>
      {/* Dark mode toggle button */}
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        {isDarkMode ? "🌙" : "☀️"}
      </button>

      <SearchBar onSearch={setCity} />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            className="loading-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              padding: "2rem",
              borderRadius: "12px",
              background: "linear-gradient(to right, #3b82f6, #6366f1)",
              color: "white",
              fontSize: "1.5rem",
              fontWeight: "bold",
              textAlign: "center",
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
              maxWidth: "400px",
              margin: "2rem auto",
            }}
          >
            Chargement de la météo...
          </motion.div>
        ) : isError ? (
          <motion.div
            key="error"
            className="error-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              padding: "1.5rem",
              borderRadius: "12px",
              backgroundColor: "#fee2e2",
              color: "#991b1b",
              fontWeight: "600",
              textAlign: "center",
              maxWidth: "400px",
              margin: "2rem auto",
              boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
            }}
          >
            Une erreur est survenue. Veuillez vérifier le nom de la ville.
          </motion.div>
        ) : data ? (
          <motion.div
            key="weather"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 1 }}
            className="weather-content"
          >
            <WeatherInfo {...data.current} />
            {Array.isArray(data.daily) && <DailyForecast data={data.daily} />}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default Weather;
