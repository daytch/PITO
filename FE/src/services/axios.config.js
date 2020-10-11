import axios from 'axios';
const config = require('./../services/config');

const API_URL = config.API_URL;

const instance = axios.create({
// .. where we make our configurations
    baseURL: API_URL
});

// Where you would set stuff like your 'Authorization' header, etc ...
instance.defaults.headers.common['x-access-token'] = localStorage.getItem('accessToken');

// Also add/ configure interceptors && all the other cool stuff

// instance.interceptors.request...

export default instance;