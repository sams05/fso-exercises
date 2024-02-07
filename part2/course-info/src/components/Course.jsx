const Header = ({ name }) => <h2>{name}</h2>;

const Total = ({ sum }) => (
    <p>
        <b>total of {sum} exercises</b>
    </p>
);

const Part = ({ part }) => (
    <p>
        {part.name} {part.exercises}
    </p>
);

const Content = ({ parts }) => parts.map((part) => <Part key={part.id} part={part} />);

const Course = ({ course: { name, parts } }) => {
    const sum = parts.reduce((sum, part) => (sum += part.exercises), 0);
    return (
        <div>
            <Header name={name} />
            <Content parts={parts} />
            <Total sum={sum} />
        </div>
    );
};

export default Course;
