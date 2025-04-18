import React, { useState } from "react";
import SearchBar from "../SearchBar.tsx";
import WeatherInfo from "../WeatherInfo";
import WeatherDetails from "../WeatherDetails";
import { useWeather } from "../../hooks/useWeather";
import { Toaster, toast } from "react-hot-toast";
import "./index.css";

/*
- Découper le code en plusieurs fichiers
- Mieux gérer l'appel API
- Gérer l'appel API sur plusieurs jours
- Gérer la langue
- Gérer la barre de recherche
- Gérer le alert avec une notification
- Mettre un message d'erreur indiquant qu'il y a un problème d'API
- Typer le code
- Le tester
- Améliorer le design
- Mettre une animation à l'ouverture de la page
- City Historic
*/

const Weather: React.FC = () => {
  const [city, setCity] = useState("Paris");
  const { data, error } = useWeather(city);

  if (error) toast.error(error.message);

  console.log('data', data)

  return (
    <div className="weather">
      <Toaster position="top-center" />
      <SearchBar onSearch={setCity} />
      {data && (
        <>
          <WeatherInfo data={data} />
          <WeatherDetails data={data} />
        </>
      )}
    </div>
  );
};

export default Weather;

