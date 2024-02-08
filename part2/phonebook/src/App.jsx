import { useState, useEffect } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [query, setQuery] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3001/persons').then((response) => {
            setPersons(response.data);
        });
    }, []);

    const handleFilterOnChange = (e) => {
        setQuery(e.target.value.toLowerCase());
    };

    const handleOnNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleOnNumberChange = (e) => {
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
            <Filter query={query} onChange={handleFilterOnChange} />
            <h2>add a new</h2>
            <PersonForm
                onSubmit={handleSubmit}
                nameVal={newName}
                numberVal={newNumber}
                onNameChange={handleOnNameChange}
                onNumberChange={handleOnNumberChange}
            />
            <h2>Numbers</h2>
            <Persons persons={personsToShow} />
        </div>
    );
};

export default App;
