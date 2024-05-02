import React, { useState } from "react";
import "./Weather.css";

const apiKey: string = "32b40b115c47d06fec6b9dc66735a47c";
const apiUrl: string = "https://api.openweathermap.org/data/2.5/";

interface WeatherData {
  main: {
    temp: number;
  };
  name: string;
  sys: {
    country: string;
  };
  weather: {
    main: string;
    icon: string;
  }[];
}

const Weather: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loadingWeather, setLoadingWeather] = useState<boolean>(false);
  const [showBar, setShowBar] = useState<boolean>(false);

  const search = (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingWeather(true);
    fetch(`${apiUrl}/weather?q=${query}&units=metric&APPID=${apiKey}`)
      .then((response) => {
        console.log(response.status);
        if (response.status !== 200) {
          console.log("something went wrong", response.status);
          setWeather(null);
          setLoadingWeather(false);
          return false;
        }
        response.json().then((result: WeatherData) => {
          console.log(result);
          setWeather(result);
          setLoadingWeather(false);
          console.log(result.name, result.main.temp);
          setShowBar(false);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setInputRefFocus = (input: HTMLInputElement | null) => {
    if (input !== null) {
      input.focus();
    }
  };

  const openSearchBox = () => {
    setQuery("");
    setShowBar(true);
  };

  const closeSearchBox = () => {
    setShowBar(false);
    setQuery("");
  };

  return (
    <div
      className={
        "weather bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-amber-200 via-violet-600 to-sky-900 " +
        (weather &&
          (weather.main.temp > 15
            ? "weather-warm bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-700 via-orange-300 to-rose-800"
            : null))
      }
    >
      <div
        className={"search-box " + (showBar ? "bar-shown" : "bar-not-shown")}
      >
        <form onSubmit={search}>
          <input
            type="text"
            className="search-bar"
            placeholder="Search for a city"
            onChange={(e) => setQuery(e.target.value)}
            ref={setInputRefFocus}
            value={query}
          />
        </form>
        <button className="btn-close" onClick={closeSearchBox}>
          X
        </button>
      </div>
      <button
        style={{ opacity: showBar ? "0" : "1" }}
        className="btn-search"
        onClick={openSearchBox}
      >
        Search
      </button>
      {weather ? (
        <div className="weather-widget ">
          <div className="weather-box">
            <div className="temp">
              <div className="celcius">
                {weather && Math.round(weather.main.temp)}°C
              </div>
              <div className="main">{weather && weather.weather[0].main}</div>
            </div>
            <div className="weather-icon">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
              />
            </div>
          </div>
          <div className="location">
            {weather && `${weather.name}, ${weather.sys.country}`}
          </div>
        </div>
      ) : (
        <div className="weather-widget">
          {loadingWeather ? (
            <h4 className="clean-search">Loading data...</h4>
          ) : (
            <h3 className="clean-search">Search for a proper city name</h3>
          )}
        </div>
      )}
    </div>
  );
};

export default Weather;
