import React from "react";
import { WeatherData } from "../../hooks/useWeather";

import humidityIcon from "../../assets/humidity.png";
import windIcon from "../../assets/wind.png";

const WeatherDetails: React.FC<{ data: WeatherData }> = ({ data }) => (
  <div className="weather__details">
    <div className="weather__col">
      <img src={humidityIcon} alt="humidity" className="weather__detail-icon" />
      <div>
        <p>{data.humidity} %</p>
        <span>Humidity</span>
      </div>
    </div>
    <div className="weather__col">
      <img src={windIcon} alt="wind" className="weather__detail-icon" />
      <div>
        <p>{data.windSpeed} km/h</p>
        <span>Wind Speed</span>
      </div>
    </div>
  </div>
);

export default WeatherDetails;
