const Header = (props) => <h1>{props.course}</h1>;

const Part = (props) => (
    <p>
        {props.name} {props.numExercises}
    </p>
);

const Content = (props) => (
    <div>
        <Part name={props.parts[0].name} numExercises={props.parts[0].numExercises} />
        <Part name={props.parts[1].name} numExercises={props.parts[1].numExercises} />
        <Part name={props.parts[2].name} numExercises={props.parts[2].numExercises} />
    </div>
);

const Total = (props) => <p>Number of exercises {props.total}</p>;

const App = () => {
    const course = 'Half Stack application development';
    const part1 = {
        name: 'Fundamentals of React',
        exercises: 10,
    };
    const part2 = {
        name: 'Using props to pass data',
        exercises: 7,
    };
    const part3 = {
        name: 'State of a component',
        exercises: 14,
    };
    const parts = [
        { name: part1.name, numExercises: part1.exercises },
        { name: part2.name, numExercises: part2.exercises },
        { name: part3.name, numExercises: part3.exercises },
    ];

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total total={part1.exercises + part2.exercises + part3.exercises} />
        </div>
    );
};

export default App;
