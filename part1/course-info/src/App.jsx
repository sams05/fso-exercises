function Header(props) {
    return <h1>{props.course}</h1>;
}

function Part(props) {
   return <p>
        {props.name} {props.numExercises}
    </p>;
}

function Content(props) {
    return (
        <div>
			<Part name={props.parts[0].name} numExercises={props.parts[0].numExercises} />
			<Part name={props.parts[1].name} numExercises={props.parts[1].numExercises} />
			<Part name={props.parts[2].name} numExercises={props.parts[2].numExercises} />
        </div>
    );
}

function Total(props) {
    return <p>Number of exercises {props.total}</p>;
}

function App() {
    const course = 'Half Stack application development';
    const part1 = 'Fundamentals of React';
    const exercises1 = 10;
    const part2 = 'Using props to pass data';
    const exercises2 = 7;
    const part3 = 'State of a component';
    const exercises3 = 14;
    const parts = [
        { name: part1, numExercises: exercises1 },
        { name: part2, numExercises: exercises2 },
        { name: part3, numExercises: exercises3 },
    ];

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total total={exercises1 + exercises2 + exercises3} />
        </div>
    );
}

export default App;
