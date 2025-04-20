import React from "react";
import humidityIcon from "../../assets/humidity.png";
import windIcon from "../../assets/wind.png";
import iconMap from "../../utils/iconMap";

import "./index.css"; 
/**
 * `WeatherInfo` component displays the current weather information for a given city,
 * including the temperature, city name, weather icon, humidity, and wind speed.
 *
 * @component
 * @example
 * <WeatherInfo temp={20} city="Paris" icon="01d" humidity={75} wind={15} />
 *
 * @param {number} temp - The current temperature in Celsius.
 * @param {string} city - The name of the city.
 * @param {string} icon - The weather icon code (used to map to a specific icon).
 * @param {number} humidity - The humidity percentage.
 * @param {number} wind - The wind speed in km/h.
 *
 * @returns {JSX.Element} A `div` element containing weather information for the city.
 */
interface WeatherInfoProps {
  temp: number;
  city: string;
  icon: string;
  humidity: number;
  wind: number;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ temp, city, icon, humidity, wind }) => {
  return (
    <div className="weather-info">
      <img src={iconMap[icon]} alt="weather" className="weather-info__icon" />
      <h1 className="weather-info__temperature">{temp}°C</h1>
      <h2 className="weather-info__city">{city}</h2>
      <div className="weather-info__details">
        <div className="weather-info__detail">
          <img src={humidityIcon} alt="Humidity" className="weather-info__detail-icon" />
          <span className="weather-info__detail-text">{humidity}%</span>
        </div>
        <div className="weather-info__detail">
          <img src={windIcon} alt="Wind" className="weather-info__detail-icon" />
          <span className="weather-info__detail-text">{wind} km/h</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherInfo;
