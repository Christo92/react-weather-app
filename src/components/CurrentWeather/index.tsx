import React from "react";
import humidityIcon from "../assets/humidity.png";
import windIcon from "../assets/wind.png";
import clearIcon from "../assets/clear.png";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";
import './index.css'

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

interface CurrentWeatherProps {
  data: {
    icon: string;
    temp: number;
    city: string;
    humidity: number;
    wind: number;
  };
}

/**
 * `CurrentWeather` component displays the current weather conditions for a specified city.
 * It shows the weather icon, temperature, city name, humidity, and wind speed.
 * The component changes background color based on temperature (dark theme for cold weather).
 *
 * @component
 * @example
 * const data = {
 *   icon: "01d",
 *   temp: 22,
 *   city: "New York",
 *   humidity: 60,
 *   wind: 15
 * };
 * <CurrentWeather data={data} />
 *
 * @param {object} data - Weather data for the current conditions.
 * @param {string} data.icon - Icon code representing the weather condition.
 * @param {number} data.temp - Current temperature in Celsius.
 * @param {string} data.city - Name of the city.
 * @param {number} data.humidity - Humidity percentage.
 * @param {number} data.wind - Wind speed in km/h.
 *
 * @returns {JSX.Element} A `div` element containing weather information.
 */
const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  const icon = allIcons[data.icon] || clearIcon;

  return (
    <div className={`weather-container ${data.temp < 0 ? 'dark' : ''}`} data-testid="weather-container">
      <div className="weather-info">
        <img src={icon} alt="weather" />
        <h2>{data.temp}°C</h2>
        <p>{data.city}</p>
      </div>
      <div className="weather-details">
        <div className="detail">
          <img src={humidityIcon} alt="humidity" />
          <span>{data.humidity}%</span>
        </div>
        <div className="detail">
          <img src={windIcon} alt="wind" />
          <span>{data.wind} km/h</span>
        </div>
      </div>
    </div>
  );
};


export default CurrentWeather;
