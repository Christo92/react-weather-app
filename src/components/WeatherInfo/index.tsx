import React from "react";
import { WeatherData } from "../../hooks/useWeather";

const WeatherInfo: React.FC<{ data: WeatherData }> = ({ data }) => (
  <>
    <img src={data.icon} alt="weather" className="weather__icon" />
    <p className="weather__temperature">{data.temperature}°C</p>
    <p className="weather__location">{data.location}</p>
  </>
);

export default WeatherInfo;
