const Weather = ({ location, weather }) => (
    <div>
        <h3>Weather in {location}</h3>
        <p>temperature {weather.temp} Celsius</p>
        <img
            src={`https://openweathermap.org/img/wn/${weather.condition.icon}@2x.png`}
            alt={weather.condition.description}
        />
        <p>wind {weather.windSpeed} m/s</p>
    </div>
);

export default Weather;
