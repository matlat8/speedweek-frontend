import axios from 'axios';

const swAPI = axios.create({
    baseURL: process.env.BASE_API_URL || 'https://api.speedweektt.com',
    withCredentials: true,
});

export default swAPI;