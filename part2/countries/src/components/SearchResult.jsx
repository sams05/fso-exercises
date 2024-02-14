import Country from "./Country";

const SearchResult = ({ searchResult, showCountry }) => {
    if (searchResult.length > 10) {
        return <p>Too many matches, specify another filter</p>;
    } else if (searchResult.length > 1) {
        return (
            <ul>
                {searchResult.map((country) => (
                    <li key={country.name.common}>{country.name.common}<button onClick={() => showCountry(country)}>show</button></li>
                ))}
            </ul>
        );
    } else if (searchResult.length === 1) {
        return <Country country={searchResult[0]} />;
    }
};

export default SearchResult;
