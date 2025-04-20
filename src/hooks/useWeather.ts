import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_KEY = import.meta.env.VITE_APP_OPENWEATHERMAP_ID;

/**
 * Returns the user's preferred language: 'fr' for French, 'en' otherwise.
 */
const getBrowserLang = (): string => {
  return navigator.language.startsWith("fr") ? "fr" : "en";
};

/**
 * Structure of the current weather data used by the app.
 */
interface CurrentWeather {
  icon: string;
  temp: number;
  city: string;
  humidity: number;
  wind: number;
}

/**
 * Structure of a single daily forecast item.
 */
export interface DailyForecast {
  date: string;
  temp: number;
  icon: string;
}

/**
 * Structure of the weather data returned by the hook.
 */
export interface WeatherData {
  current: CurrentWeather;
  daily: DailyForecast[];
}

/**
 * Response shape from OpenWeatherMap's /weather endpoint.
 */
interface OpenWeatherCurrentAPIResponse {
  weather: { icon: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number };
  name: string;
}

/**
 * Response shape from OpenWeatherMap's /forecast endpoint.
 */
interface OpenWeatherForecastAPIResponse {
  list: {
    dt_txt: string;
    main: { temp: number };
    weather: { icon: string }[];
  }[];
}

/**
 * Fetches weather data (current and forecast) from OpenWeatherMap API.
 *
 * @param city - The name of the city to retrieve weather data for.
 * @returns A `WeatherData` object containing current and 5-day forecast information.
 */
const fetchWeather = async (city: string): Promise<WeatherData> => {
  const lang = getBrowserLang();

  const [currentRes, forecastRes] = await Promise.all([
    axios.get<OpenWeatherCurrentAPIResponse>(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=${lang}`
    ),
    axios.get<OpenWeatherForecastAPIResponse>(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=${lang}`
    ),
  ]);

  const currentData = currentRes.data;
  const forecastData = forecastRes.data;

  return {
    current: {
      icon: currentData.weather[0].icon,
      temp: Math.round(currentData.main.temp),
      city: currentData.name,
      humidity: currentData.main.humidity,
      wind: currentData.wind.speed,
    },
    daily: extractDailyForecast(forecastData.list),
  };
};

/**
 * Extracts one average daily forecast for the next 5 days from the forecast list.
 *
 * @param list - The list of 3-hour forecast intervals from the API.
 * @returns A list of 5 items, each representing one daily average forecast.
 */
const extractDailyForecast = (list: OpenWeatherForecastAPIResponse["list"]): DailyForecast[] => {
  const dailyMap: { [date: string]: typeof list } = {};

  list.forEach((item) => {
    const date = new Date(item.dt_txt).toLocaleDateString();
    if (!dailyMap[date]) dailyMap[date] = [];
    dailyMap[date].push(item);
  });

  return Object.entries(dailyMap)
    .slice(0, 5)
    .map(([date, values]) => {
      const temps = values.map((v) => v.main.temp);
      const avgTemp = Math.round(temps.reduce((a, b) => a + b, 0) / temps.length);
      const icon = values[0].weather[0].icon;

      return { date, temp: avgTemp, icon };
    });
};

/**
 * React Query hook to fetch and cache weather data for a specific city.
 *
 * @param city - The name of the city to fetch weather data for.
 * @returns A query object containing `data`, `isLoading`, and `isError` fields.
 */
export const useWeather = (city: string) => {
  return useQuery<WeatherData>({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
    enabled: !!city,
  });
};
