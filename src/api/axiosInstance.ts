import axios from 'axios';

const swAPI = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || 'https://api.speedweektt.com',
    withCredentials: true,
});

export default swAPI;