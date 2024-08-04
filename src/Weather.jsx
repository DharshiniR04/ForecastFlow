import React, { useState } from "react";
import './Weather.css';
import Video from './assets/car.mp4';

function Weather() {
    const api = {
        key: "3252fed708c47312fd9cac9c3dc35a38",
        base: "https://api.openweathermap.org/data/2.5/",
    };

    const [weather, setWeather] = useState('');
    const [data, setData] = useState({});
    const [error, setError] = useState(null);

    function Search() {
        fetch(`${api.base}weather?q=${weather}&units=metric&APPID=${api.key}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('City not found');
                }
                return res.json();
            })
            .then((res) => {
                setData(res);
                setError(null);
            })
            .catch((err) => {
                setError('Enter city name properly');
                setData({});
            });
    }

    return (
        <div>
            <video autoPlay muted loop>
                <source src={Video}></source>
            </video>
            <div id="Main">
                <h1>Weather App</h1>
                <input onChange={(e) => setWeather(e.target.value)} placeholder="Enter city name"></input><br />
                <button onClick={Search}>Search</button>
                {error && <p className="error">Error: {error}</p>}
                {typeof data.main !== "undefined" ? (
                    <div>
                        <p>Location: {data.name}</p>
                        <p>Celsius: {data.main.temp}°C</p>
                        <p>Status: {data.weather?.[0]?.main}</p>
                        <p>Atmospheric conditions: {data.weather?.[0]?.description}</p>
                    </div>
                ) : (
                    <div>
                        <p>Location:</p>
                        <p>Celsius:</p>
                        <p>Status:</p>
                        <p>Atmospheric conditions:</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Weather;
