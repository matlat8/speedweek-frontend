import { useQuery } from "@tanstack/react-query";

import swAPI from '@/api/axiosInstance'

export const fetchWeeks = async (league_id: number, season_id: number) => {
    const response = await swAPI.get(`leagues/${league_id}/seasons/${season_id}/weeks`);
    return response.data;
}

export const fetchLaps = async(leagueId: number, season_id: number, weekId: number) => {
    const response = await swAPI.get(`leagues/${leagueId}/seasons/${season_id}/weeks/${weekId}/laps`);
    return response.data;
}