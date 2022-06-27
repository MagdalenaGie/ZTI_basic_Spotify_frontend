import axios from 'axios';

const DBinstance = axios.create({
    baseURL: 'https://zti-backend.herokuapp.com/',
});

export default DBinstance;