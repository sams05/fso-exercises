const PersonForm = ({ onSubmit, nameVal, numberVal, onNameChange, onNumberChange }) => (
    <form onSubmit={onSubmit}>
        <div>
            name: <input value={nameVal} onChange={onNameChange} />
        </div>
        <div>
            number: <input value={numberVal} onChange={onNumberChange} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
);

export default PersonForm;
