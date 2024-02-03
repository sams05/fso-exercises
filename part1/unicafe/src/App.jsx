import { useState } from 'react';

const Heading = ({ text }) => <h1>{text}</h1>;

const Option = ({ onClick, text }) => {
    return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({ counts: { good, neutral, bad } }) => {
    const totalCount = good + neutral + bad;

    if (totalCount === 0) {
        return <p>No feedback given</p>;
    }

    const totalVal = good - bad;

    return (
        <div>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {totalCount}</p>
            <p>average {totalVal / totalCount}</p>
            <p>positive {(good / totalCount) * 100}%</p>
        </div>
    );
};

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const createFeedbackHandler = (choice, setChoice) => {
        const incrementCount = () => {
            setChoice(++choice);
        };
        return incrementCount;
    };

    return (
        <div>
            <Heading text={'give feedback'} />
            <Option onClick={createFeedbackHandler(good, setGood)} text="good" />
            <Option onClick={createFeedbackHandler(neutral, setNeutral)} text="neutral" />
            <Option onClick={createFeedbackHandler(bad, setBad)} text="bad" />
            <Heading text={'statistics'} />
            <Statistics counts={{ good, neutral, bad }} />
        </div>
    );
};

export default App;
