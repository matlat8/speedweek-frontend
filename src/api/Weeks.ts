import { useQuery } from "@tanstack/react-query";

import swAPI from '@/api/axiosInstance'

export const fetchWeeks = async (league_id: number, season_id: number) => {
    const response = await swAPI.get(`leagues/${league_id}/seasons/${season_id}/weeks`);
    return response.data;
}