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

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1,
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2,
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3,
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4,
                },
            ],
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1,
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2,
                },
            ],
        },
    ];

    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map((course) => (
                <Course key={course.id} course={course} />
            ))}
        </div>
    );
};

export default App;
