import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import clearIcon from "../assets/clear.png";
import cloudIcon from "../assets/cloud.png";
import drizzleIcon from "../assets/drizzle.png";
import rainIcon from "../assets/rain.png";
import snowIcon from "../assets/snow.png";

export interface WeatherData {
  humidity: number;
  windSpeed: number;
  temperature: number;
  location: string;
  icon: string;
}

const iconMap: Record<string, string> = {
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

const fetchWeather = async (
  city: string,
  lang: string
): Promise<WeatherData> => {
  const apiKey = import.meta.env.VITE_APP_OPENWEATHERMAP_ID;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=${lang}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok) throw new Error(data.message);

  return {
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
    temperature: Math.floor(data.main.temp),
    location: data.name,
    icon: iconMap[data.weather[0].icon] || "",
  };
};

export const useWeather = (city: string) => {
  const [lang, setLang] = useState("en");

  useEffect(() => {
    setLang(navigator.language.split("-")[0]);
  }, []);

  return useQuery<WeatherData, Error>({
    queryKey: ["weather", city, lang],
    queryFn: () => fetchWeather(city, lang),
    enabled: !!city,
  });
};
