import axios from 'axios';
const API_KEY = import.meta.env.VITE_APP_KEY;
const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;

const get = (lat, lon) =>
    axios.get(`${BASE_URL}&lat=${lat}&lon=${lon}`).then((response) => {
        const {
            main: {temp},
            weather: [condition],
            wind: { speed: windSpeed },
        } = response.data;
        return {temp, condition, windSpeed}
    });

export default { get };
