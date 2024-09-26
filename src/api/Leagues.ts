import axios from 'axios';

import swAPI from './axiosInstance';

const fetchLeagues = async () => {
    const response = await swAPI.get('/leagues');
    return response.data;
}

export const fetchLeagueDetails = async (id: number) => {
    const response = await swAPI.get(`/leagues/${id}`);
    return response.data;
}

export interface LeagueMember {
    id: number;
    is_owner: boolean;
    is_admin: boolean;
    user_id: string;
    display_name: string;
}
interface LeagueMembersResponse {
    data: LeagueMember[];
}
export const fetchLeagueMembers = async (id: number) => {
    const response = await swAPI.get<LeagueMembersResponse>(`/leagues/${id}/members`);
    return response.data
}

export default fetchLeagues;



