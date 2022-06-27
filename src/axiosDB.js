import axios from 'axios';

const DBinstance = axios.create({
    baseURL: 'http://zti-backend.herokuapp.com/',
});

export default DBinstance;