import { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');

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
			number: newNumber
        };
        setPersons(persons.concat(newPerson));
        setNewName('');
		setNewNumber('');
    };

    return (
        <div>
            <h2>Phonebook</h2>
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
            {persons.map((person) => (
                <p key={person.name}>{person.name} {person.number}</p>
            ))}
        </div>
    );
};

export default App;
