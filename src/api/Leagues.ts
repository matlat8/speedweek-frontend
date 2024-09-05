import axios from 'axios';

import swAPI from './axiosInstance';

const fetchLeagues = async () => {
    const response = await swAPI.get('/leagues');
    return response.data;
}

export default fetchLeagues;

