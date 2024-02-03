import { useState } from 'react';

const Heading = ({ text }) => <h1>{text}</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({text, value}) => <p>{text} {value}</p>;

const Statistics = ({ counts: { good, neutral, bad } }) => {
    const totalCount = good + neutral + bad;

    if (totalCount === 0) {
        return <p>No feedback given</p>;
    }

    const totalVal = good - bad;

    return (
        <div>
			<StatisticLine text="good" value={good} />
			<StatisticLine text="neutral" value={neutral} />
			<StatisticLine text="bad" value={bad} />
			<StatisticLine text="all" value={totalCount} />
			<StatisticLine text="average" value={totalVal / totalCount} />
			<StatisticLine text="positive" value={`${(good / totalCount) * 100}%`} />
        </div>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const createButtonHandler = (choice, setChoice) => {
        const incrementCount = () => {
            setChoice(++choice);
        };
        return incrementCount;
    };

    return (
        <div>
            <Heading text={'give feedback'} />
            <Button onClick={createButtonHandler(good, setGood)} text="good" />
            <Button onClick={createButtonHandler(neutral, setNeutral)} text="neutral" />
            <Button onClick={createButtonHandler(bad, setBad)} text="bad" />
            <Heading text={'statistics'} />
            <Statistics counts={{ good, neutral, bad }} />
        </div>
    );
};

export default App;
