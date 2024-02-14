import { useState, useEffect } from 'react';
import weatherService from '../services/weather';
import Weather from './Weather';

const Country = ({ country }) => {
    const [weather, setWeather] = useState(null);
    useEffect(() => {
        const {
            capitalInfo: {
                latlng: [lat, lon],
            },
        } = country;
        weatherService.get(lat, lon).then((weather) => setWeather(weather));
    }, [country]);

    const {
        name,
        capital: [capital],
        area,
        languages,
        flags,
    } = country;

    const flagStyle = {
        width: 200,
    };

    const weatherComponent = weather ? <Weather location={capital} weather={weather} /> : null;

    return (
        <div>
            <h2>{name.common}</h2>
            <p>capital {capital}</p>
            <p>area {area}</p>
            <h3>languages: </h3>
            <ul>
                {Object.values(languages).map((language) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img src={flags.svg} alt={flags.alt} style={flagStyle} />
            {weatherComponent}
        </div>
    );
};

export default Country;
