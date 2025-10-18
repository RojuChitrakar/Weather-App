import { useState } from "react";


export default function WeatherForm() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "bc194dd15a0e5fc27d8b99d626cbd191";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city) {
      setError("Enter the city name.");
      return;
    }
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (res.ok) {
        setWeather(data);
      } else {
        setError(data.message);
      }
    } catch {
      setError("Something went wrong!");
    }

    setLoading(false);
  };

  return (
    <div className="weather-container">
      <h1 className="title">🌤️ Weather App</h1>

      <form onSubmit={handleSubmit} className="weather-form">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>

      {error && <p className="error">{error}</p>}
      {loading && <p className="loading">Loading...</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>Feels Like: {weather.main.feels_like}°C</p>
          <p>Min Temperature: {weather.main.temp_min}°C</p>
          <p>Max Temperature: {weather.main.temp_max}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}
