const Person = ({ person: { name, number } }) => (
    <p>
        {name} {number}
    </p>
);

const Persons = ({ persons }) => (
    <div>
        {persons.map((person) => (
            <Person key={person.id} person={person} />
        ))}
    </div>
);

export default Persons;
