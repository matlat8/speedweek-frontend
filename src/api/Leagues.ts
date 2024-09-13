import axios from 'axios';

import swAPI from './axiosInstance';

const fetchLeagues = async () => {
    const response = await swAPI.get('/leagues');
    return response.data;
}

export const fetchLeagueDetails = async (id: int) => {
    const response = await swAPI.get(`/leagues/${id}`);
    return response.data;
}

export const fetchLeagueMembers = async (id: int) => {
    const response = await swAPI.get(`/leagues/${id}/members`);
    return response.data
}

export default fetchLeagues;



