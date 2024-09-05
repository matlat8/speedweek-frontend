import axios from 'axios';

import swAPI from './axiosInstance';

export const fetchMyTeams = async () => {
    const response = await swAPI.get('/teams');
    return response.data;
}

