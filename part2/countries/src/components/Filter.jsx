const Filter = ({ query, filter }) => (
    <label>
        find countries <input type="text" value={query} onChange={filter} />
    </label>
);
export default Filter;
