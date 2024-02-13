const Country = ({ country }) => {
    const {
        name,
        capital: [capital],
        area,
        languages,
        flags,
    } = country;

    const flagStyle = {
        width: 200
    }

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
        </div>
    );
};

export default Country;
