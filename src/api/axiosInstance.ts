import axios from 'axios';

const swAPI = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
});

export default swAPI;