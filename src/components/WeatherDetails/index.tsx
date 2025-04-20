import React from "react";
import humidityIcon from "../../assets/humidity.png";
import windIcon from "../../assets/wind.png";
import './index.css'

interface WeatherDetailsProps {
  humidity: number;
  wind: number;
}

/**
 * `WeatherDetails` component displays the weather details such as humidity and wind speed.
 * It takes `humidity` and `wind` as props and displays them with corresponding icons.
 *
 * @component
 * @example
 * <WeatherDetails humidity={75} wind={10} />
 *
 * @param {number} humidity - The humidity percentage.
 * @param {number} wind - The wind speed in km/h.
 *
 * @returns {JSX.Element} A `div` element containing humidity and wind speed information.
 */
const WeatherDetails: React.FC<WeatherDetailsProps> = ({ humidity, wind }) => {
  return (
    <div className="weather-details-container">
      <div className="weather-detail">
        <img src={humidityIcon} alt="Humidity" className="icon" />
        <span>{humidity}%</span>
      </div>
      <div className="weather-detail">
        <img src={windIcon} alt="Wind" className="icon" />
        <span>{wind} km/h</span>
      </div>
    </div>
  );
};

export default WeatherDetails;
