const DeletionButton = ({ deletePerson }) => <button onClick={deletePerson}>delete</button>;

const Person = ({ person: { name, number }, deletePerson }) => (
    <p>
        {name} {number} <DeletionButton deletePerson={deletePerson} />
    </p>
);

const Persons = ({ persons, deletePerson }) => (
    <div>
        {persons.map((person) => (
            <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)} />
        ))}
    </div>
);

export default Persons;
