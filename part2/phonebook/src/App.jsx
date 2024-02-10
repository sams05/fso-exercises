import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [query, setQuery] = useState('');

    useEffect(() => {
        personService.getAll().then((initialPersons) => setPersons(initialPersons));
    }, []);

    const handleFilterChange = (e) => {
        setQuery(e.target.value.toLowerCase());
    };

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    };

    const handleNumberChange = (e) => {
        setNewNumber(e.target.value);
    };

    const changeNumber = (personToChange) => {
        const userConfirmed = window.confirm(`${personToChange.name} is already added to phonebook, replace the old number with a new one?`);
        if(userConfirmed) {
            const changedPerson = {...personToChange, number: newNumber}
            personService.change(changedPerson.id, changedPerson).then((updatedPerson) => {
                setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson));
                setNewName('');
                setNewNumber('');
            })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if name is already in phonebook
        const foundPerson = persons.find((person) => person.name === newName);
        if (foundPerson) {
            changeNumber(foundPerson);
            return;
        }
        // Add new person
        const newPerson = {
            name: newName,
            number: newNumber,
        };

        personService.create(newPerson).then((newPerson) => {
            setPersons(persons.concat(newPerson));
            setNewName('');
            setNewNumber('');
        });
    };

    const handleDeletePerson = (id) => {
        const personToDelete = persons.find(({ id: curId }) => id === curId);
        const userConfirmed = window.confirm(`Delete ${personToDelete.name}?`);
        if (userConfirmed) {
            personService.deletePerson(id).then((deletedPerson) => {
                setPersons(persons.filter(({ id }) => id != deletedPerson.id));
            });
        }
    };

    const personsToShow = persons.filter(({ name }) => name.toLowerCase().includes(query));

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter query={query} onChange={handleFilterChange} />
            <h2>add a new</h2>
            <PersonForm
                onSubmit={handleSubmit}
                nameVal={newName}
                numberVal={newNumber}
                onNameChange={handleNameChange}
                onNumberChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons persons={personsToShow} deletePerson={handleDeletePerson} />
        </div>
    );
};

export default App;
