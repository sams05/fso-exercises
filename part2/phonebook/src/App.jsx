import { useState } from 'react';

const App = () => {
    const [persons, setPersons] = useState([{ name: 'Arto Hellas' }]);
    const [newName, setNewName] = useState('');

    const handleOnChange = (e) => {
        setNewName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
		// Check if name is already in phonebook
		const invalid = persons.some((person) => person.name === newName);
        if (invalid) {
            alert(`${newName} is already added to the phonebook`);
			return;
        }
        const newPerson = {
            name: newName,
        };
        setPersons(persons.concat(newPerson));
        setNewName('');
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input value={newName} onChange={handleOnChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => (
                <p key={person.name}>{person.name}</p>
            ))}
        </div>
    );
};

export default App;
