import axios from 'axios';
const BASE_URL = 'http://localhost:3001/persons';

const getAll = () => axios.get(BASE_URL).then((response) => response.data);

const create = (newPerson) => axios.post(BASE_URL, newPerson).then((response) => response.data);

const deletePerson = (id) => axios.delete(`${BASE_URL}/${id}`).then((response) => response.data);

export default {
    getAll,
    create,
    deletePerson
};
