import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import SearchResult from './components/SearchResult';
import countryService from './services/countries';

function App() {
    const [countries, setCountries] = useState([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        countryService.getAll().then((countries) => {
            setCountries(countries);
        });
    }, []);

    const handleFilter = (e) => {
        setQuery(e.target.value);
    };

    const searchResult = countries.filter((country) => country.name.common.toLowerCase().includes(query.toLowerCase()));

    return (
        <div>
            <Filter query={query} filter={handleFilter} />
            <SearchResult searchResult={searchResult} />
        </div>
    );
}

export default App;
