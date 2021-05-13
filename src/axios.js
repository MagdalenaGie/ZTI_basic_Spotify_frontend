import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://itunes.apple.com/',
});

export default instance;