import React, { useState } from "react";
import './App.css';

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apikey = process.env.REACT_APP_WEATHER_API_KEY;

  const fetchweather = async () => {
    if (city === "") {
      setError("Lütfen bir şehir adı girin.");
      return;
    };

    setError("");
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`
      );
      const data = await response.json();
      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (error) {
      setError('Bir hata oluştu, lütfen tekrar deneyin.');
      setWeather(null);
    }
  };
  return (
    <div className="App">
      <h1>Hava Durumu Uygulaması</h1>
      <div className="input-container">
        <input
         type="text"
         value={city}
         onChange={(e) => setCity(e.target.value)}
         placeholder="Şehir adı giriniz"
        />
        <button onClick={fetchweather}>Getir</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p>Sıcaklık: {weather.main.temp}°C</p>
          <p>Hava Durumu: {weather.weather[0].description}</p>
          <p>Nem: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
