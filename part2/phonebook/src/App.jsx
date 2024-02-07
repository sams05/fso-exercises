import { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [query, setQuery] = useState('');

    const handleQueryOnChange = (e) => {
        setQuery(e.target.value.toLowerCase());
    };

    const handleNameOnChange = (e) => {
        setNewName(e.target.value);
    };

    const handleNumberOnChange = (e) => {
        setNewNumber(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if name is already in phonebook
        const invalid = persons.some((person) => person.name === newName);
        if (invalid) {
            alert(`${newName} is already added to the phonebook`);
            return;
        }
        // Add new person
        const newPerson = {
            name: newName,
            number: newNumber,
            id: persons.length + 1,
        };
        setPersons(persons.concat(newPerson));
        setNewName('');
        setNewNumber('');
    };

    const personsToShow = persons.filter(({ name }) => name.toLowerCase().includes(query));

    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with <input value={query} onChange={handleQueryOnChange} />
            </div>
            <h2>add a new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input value={newName} onChange={handleNameOnChange} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberOnChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {personsToShow.map((person) => (
                <p key={person.id}>
                    {person.name} {person.number}
                </p>
            ))}
        </div>
    );
};

export default App;
