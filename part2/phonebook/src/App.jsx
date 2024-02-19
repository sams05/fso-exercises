import { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personService from './services/persons';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [query, setQuery] = useState('');
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        personService.getAll().then((initialPersons) => setPersons(initialPersons));
    }, []);

    /**
     * Show a notification with the given message for ms milliseconds
     * @param {String} message
     * @param {Number} ms
     */
    const showNotification = (message, ms = 5000, error = false) => {
        setMessage(message);
        if(error) {
            setError(true);
        }
        setTimeout(() => {
            // Reset notification states
            setMessage(null);
            setError(false);
        }, ms);
    };

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
        const userConfirmed = window.confirm(
            `${personToChange.name} is already added to phonebook, replace the old number with a new one?`
        );
        if (userConfirmed) {
            const changedPerson = { ...personToChange, number: newNumber };
            personService
                .change(changedPerson.id, changedPerson)
                .then((updatedPerson) => {
                    setPersons(persons.map((person) => (person.id !== updatedPerson.id ? person : updatedPerson)));
                    setNewName('');
                    setNewNumber('');
                    showNotification(`${updatedPerson.name}'s phone number has been updated`, 4000);
                })
                .catch(() => {
                    setPersons(persons.filter(({ id }) => id != personToChange.id));
                    showNotification(`Information of ${personToChange.name} has already been removed from server`, 4000, true);
                });
        }
    };

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
            showNotification(`Added ${newPerson.name}`, 4000);
        });
    };

    const handleDeletePerson = (id) => {
        const personToDelete = persons.find(({ id: curId }) => id === curId);
        const userConfirmed = window.confirm(`Delete ${personToDelete.name}?`);
        if (userConfirmed) {
            personService.deletePerson(id).then(() => {
                setPersons(persons.filter(({ id }) => id !== personToDelete.id));
            });
        }
    };

    const personsToShow = persons.filter(({ name }) => name.toLowerCase().includes(query));

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} error={error} />
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
