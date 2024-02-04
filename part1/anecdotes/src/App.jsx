import { useState } from 'react';

const Heading = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Anecdote = ({ anecdotes, points, index }) => (
    <div>
        <div>{anecdotes[index]}</div>
        <p>has {points[index]} points</p>
    </div>
);

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.',
    ];

    const [selected, setSelected] = useState(0);
    const [points, setPoints] = useState(Array(anecdotes.length).fill(0));

    const vote = (selected) => {
        const newPoints = [...points];
        newPoints[selected]++;
        setPoints(newPoints);
    };

    const handleVote = () => vote(selected);

    const getRandAnecdotes = () => {
        setSelected(Math.floor(Math.random() * anecdotes.length));
    };

    const handleNextAnecdoteBtn = () => getRandAnecdotes();

    const getHighestVote = () => {
        let idx = 0;
        let highest = 0;
        for (let i = 0; i < points.length; i++) {
            if (points[i] > highest) {
                highest = points[i];
                idx = i;
            }
        }
        return idx;
    };

    return (
        <div>
            <Heading text="Anecdote of the day" />
            <Anecdote anecdotes={anecdotes} points={points} index={selected} />
            <Button onClick={handleVote} text="vote" />
            <Button onClick={handleNextAnecdoteBtn} text="next anecdote" />

            <Heading text="Anecdote with most votes" />
            <Anecdote anecdotes={anecdotes} points={points} index={getHighestVote()} />
        </div>
    );
};

export default App;
