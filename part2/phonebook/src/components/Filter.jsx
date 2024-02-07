const Filter = ({ query, onChange }) => (
    <div>
        filter shown with <input value={query} onChange={onChange} />
    </div>
);

export default Filter;
